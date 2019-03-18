const fileModel = require('../model/model.file')
const jsonReturn = require('../jsonReturn').jsonReturn
const parseToken = require('../router/authToken').parseToken
const jwt = require('jsonwebtoken')
const fs = require('fs')
var path = require('path')

module.exports.inserFile = (req, res) => {
    parseToken(req, res)
    console.log(req.files);
    // if (Object.keys(req.files).length === 0)
    //     return jsonReturn(res, false, 'no file upload')
    jwt.verify(req.token, 'votong123', (err, autData) => {
        var userId = autData.infor._id
        // let sampleFile = req.files.sampleFile;
        var dir = `./uploads/${userId}`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        req.files.file.map(file => {
            var filename = Date.now() + file.name
            file.mv('./uploads/' + userId + '/' + filename)
            new fileModel({
                filename: filename,
                userid: userId,
                type: path.extname(filename)
            }).save()
        })
        jsonReturn(res, true, 'upload file success')
    })
}
module.exports.getFileByUserId = (req, res, userId) => {
    parseToken(req, res)
    jwt.verify(req.token, 'votong123', (err, autData) => {
        console.log(autData);

        fileModel.find({ userid: autData.infor._id })
            .exec()
            .then(rs => {
                console.log(rs);
                jsonReturn(res, true, 'get file success', rs)
            }
            )
            .catch()
    })
}
