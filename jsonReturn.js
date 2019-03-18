module.exports.jsonReturn = (res, status, message, oj) => {
    res.json({
        "status": status,
        "message": message,
        "__": oj
    })
}