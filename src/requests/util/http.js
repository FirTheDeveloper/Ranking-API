function http(url, opt) {
    opt = opt || {};
    if (!opt.headers) {
        opt.headers = {}
    };
    
    if (!url.startsWith("http")) {
        url = "https:" + url
    };  

    opt.signal = AbortSignal.timeout(30000);
    opt.redirect = 'manual'

    const shouldFollowRedirect = typeof opt.followRedirect === 'function'
        ? opt.followRedirect
        : () => !!opt.followRedirect;

    return fetch(url, opt).then(async (response) => {
        const redirect = response.headers.get('location')

        if (redirect && shouldFollowRedirect(response)) {
            return http(redirect, opt)
        };

        const body = !redirect && response?.headers?.get('content-type')?.includes('application/json') ? await response.json() : await response.text()

        return {
            body,
            bodyUsed: response.bodyUsed,
            headers: response.headers,
            ok: response.ok,
            status: response.status,
            statusCode: response.status,
            statusText: response.statusText,
            type: response.type,
            url: response.url
        }
    }).catch((err) => {
        console.error(err)
        throw err
    })
}

module.exports.func = function (args) {
    const opt = args.options || {};
    const full = opt.resolveWithFullResponse

    return http(args.url, opt).then(function (res) {
        return full ? res : res.body
    })
}