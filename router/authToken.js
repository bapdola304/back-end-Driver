const jwt = require('jsonwebtoken')
var jsonReturn = (res, status, message, user) => {
    res.json({
        "status": status,
        "message": message,
        "__": user
    })
}
var parseToken = (req, res) => {
    var bearerHeader = req.headers.authorization;
    if (typeof bearerHeader === 'undefined')
        return jsonReturn(res, false, "Token undefined")
    var bearer = bearerHeader.split(' ')
    var bearerToken = bearer[1]
    req.token = bearerToken
}
module.exports.parseToken = parseToken
module.exports.verifyTokenAdmin = (req, res, next) => {
    parseToken(req, res)
    jwt.verify(req.token, 'votong123', (err, autData) => {
        if (err)
            return jsonReturn(res, false, "Token invalid")
        if (autData.infor.admin !== true)
            jsonReturn(res, false, "Do not have permission")
        console.log(autData);
        next()
    })
}
module.exports.verifyTokenUser = (req, res, next) => {
    parseToken(req, res)
    jwt.verify(req.token, 'votong123', (err, autData) => {
        if (err)
            return jsonReturn(res, false, "Token invalid")   
        next()
    })
}
