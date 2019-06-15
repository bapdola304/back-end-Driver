module.exports.jsonReturn = (res, status, message, oj, userInfor) => {
    res.json({
        "status": status,
        "message": message,
        "data": oj,
        "userInfor" : userInfor
    })
}