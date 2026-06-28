const http = require('../util/http').func;

function setRank(group, target, role, retries = 10, delay = 500) {
    return new Promise(async (resolve, reject) => {
        const httpOpt = {
            url: `https://apis.roblox.com/cloud/v2/groups/${group}/memberships/${target}`,
            options: {
                resolveWithFullResponse: true,
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': process.env.OPENCLOUD_KEY
                },
                body: JSON.stringify({
                    role: `groups/${group}/roles/${role.ID}`,
                })
            }
        };

        http(httpOpt).then(async (res) => {
                if (res.statusCode == 200) {
                    console.log("Ranked successfully.")
                    resolve(role);
                } else {
                    console.log(res.body)
                    let body = {};
                    try {
                        body = JSON.parse(res.body)
                    } catch {}

                    reject(new Error(`${res.statusCode} ${body?.message || 'Unknown error'}`));
                }
        }).catch(error => reject(error))
    });
}


module.exports.func = function (args) {
    if (typeof args.rank === 'object') {
        args.role = args.rank
        return setRank(args.group, args.target, args.role)
    } else if (typeof args.rank === 'number' || typeof args.rank === 'string') {
        return getRole({ group: args.group, roleQuery: args.rank }).then((role) => {
            args.role = role
            return setRank(args.group, args.target, args.role)
        })
    } else {
        throw new Error('Please provide either a Role, rank, or role name to change the user\'s rank to')
    }
}