let express = require('express')
let server = express()
let setRank = require('./requests/group/setRank')

server.use(express.json())


server.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`)
})

server.patch('/setrank', (req, res) => {
    if(req.headers.authorization !== "Bearer " + process.env.KEY) {
        return res.status(403).send("Invalid API Key.")
    }
    setRank.func(req.body).then(result => {
        res.send(result)
    }).catch(error => {
        res.status(500).send(error.message)
    })
})