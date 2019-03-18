const jwt = require("jsonwebtoken")
const modelUser = require('../model/model.user')
const bcrypt = require('bcrypt')

var jsonReturn = (res, status, message, user) => {
    res.json({
        "status": status,
        "message": message,
        "Infor": user
    })
}
module.exports.login = (req, res) => {
    var un = req.body.username
    var pw = req.body.password
    modelUser.findOne({ username: un })
        .exec()
        .then(doc => {
            bcrypt.compare(pw, doc.password, (err, rs) => {
                if (err)
                    return jsonReturn(res, false, err)
                var infor = {
                    _id: doc.id,
                    username: doc.username,
                    admin: doc.admin
                }
                jwt.sign({ infor }, 'votong123', { expiresIn: '1d' }, function (err, token) {
                    jsonReturn(res, true, "login success", { token: token })
                });
            })
        })
        .catch(err => jsonReturn(res, false, err))
}
module.exports.getAllUser = (req, res) => {
    modelUser.find()
        .exec()
        .then(doc => jsonReturn(res, true, 'get all user success', doc))
        .catch(err => jsonReturn(res, false, err))
}

module.exports.getUserById = (req, res) => {
    modelUser.findById(req.params.id)
        .exec()
        .then(doc => jsonReturn(res, true, 'get user success', doc))
        .catch(err => jsonReturn(res, false, err))
}

module.exports.insertUser = (req, res) => {
    var un = req.body.username
    var pw = req.body.password
    if (!un || !pw)
        return jsonReturn(res, false, 'username or password invalid')
    modelUser.findOne({ username: un })
        .exec()
        .then(doc => {
            if (doc)
                return jsonReturn(res, false, 'usersname existed')
            bcrypt.hash(pw, 10, (err, hash) => {
                new modelUser({
                    username: un,
                    password: hash,
                    admin: false
                }).save()
                    .then((doc) => jsonReturn(res, true, 'register success', doc))
                    .catch((err) => jsonReturn(res, false, err))
            });
        })
        .catch()
}

module.exports.updateUser = (req, res) => {
    modelUser.findOne({ _id: req.body.id })
        .exec()
        .then(doc => {
            if (doc) {
                doc.password = req.body.password
                doc.save()
                    .then(doc1 => jsonReturn(res, true, 'update success', doc1))
                    .catch()
                return
            }
        })
        .catch(err => jsonReturn(res, false, err))
}

module.exports.deleteAllUser = (req, res) => {
    modelUser.remove()
        .exec()
        .then(result => jsonReturn(res, 'success', 'remove all user success', result))
        .catch()
}

module.exports.deleteUser = (req, res) => {
    modelUser.deleteOne({ _id: req.params.id })
        .exec()
        .then(result => jsonReturn(res, true, 'delete success', result))
        .catch(err => jsonReturn(res, false, err))
}


