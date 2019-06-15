const fileModel = require('../model/model.file')
const jsonReturn = require('../jsonReturn').jsonReturn
const parseToken = require('../router/authToken').parseToken
const jwt = require('jsonwebtoken')
const fs = require('fs')
var path = require('path')

module.exports.inserFile = (req, res) => {
    parseToken(req, res)
    console.log(req.files);
    jwt.verify(req.token, 'votong123', async (err, autData) => {
        var userId = autData.infor._id
        // let sampleFile = req.files.sampleFile;
        var dir = `./uploads/${userId}`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        
            if (req.files.files.length == undefined) {
                var file = req.files.files
                console.log('1');
                
                var filename = Date.now() + file.name
                    file.mv('./uploads/' + userId + '/' + filename)
                    new fileModel({
                        filename: file.name,
                        userid: userId,
                        url: userId + "/" + filename,
                        type: path.extname(filename),
                        size: file.size
                    }).save()
            } else {
                console.log('2');
                console.log(req.files);
                
                req.files.files.map(file => {
                    var filename = Date.now() + file.name
                    file.mv('./uploads/' + userId + '/' + filename)
                    new fileModel({
                        filename: file.name,
                        userid: userId,
                        url: userId + "/" + filename,
                        type: path.extname(filename),
                        size: file.size
                    }).save()
                })
            }
            let arrFile = await fileModel.find({ userid: userId })
            jsonReturn(res, true, 'upload file success', arrFile)
       
        
    })
}
module.exports.getFileByUserId = (req, res, userId) => {
    parseToken(req, res)
    jwt.verify(req.token, 'votong123', (err, autData) => {
        console.log(autData);

        fileModel.find({ userid: autData.infor._id })
            .exec()
            .then(arrFilesByUser => {
                let size = arrFilesByUser.reduce((Total, sizeFile) => Total + sizeFile.size, 0);
                console.log(arrFilesByUser);

                console.log(((size / 1024) / 1024) / 1024);
                let sizeConvertBGB = (((size / 1024) / 1024) / 1024).toFixed(3)
                console.log(sizeConvertBGB);

                let userInfor = {
                    size: sizeConvertBGB,
                    username: autData.infor.username,
                    isAdmin: autData.infor.admin
                }
                jsonReturn(res, true, 'get file success', arrFilesByUser, userInfor)
            }
            )
            .catch()
    })
}
module.exports.deleteFile = (req, res) => {
    let id = req.params.id
    console.log(id);
    fileModel.findOne({ _id: id }).then(file => {

        fileModel.deleteOne({ _id: id })
            .then(res => {
                fs.unlinkSync('./uploads/' + file.url);
                return jsonReturn(res, true, 'delete file success', rs)
            })
            .catch(err => jsonReturn(res, false, 'delete file fail', err))

    })
}
module.exports.editFileName = (req, res) => {
    let id = req.params.id
    console.log(req.body.data);
    
    console.log(id);
    fileModel.updateOne({ _id: id }, { filename : req.body.data }).then(file => {
        return jsonReturn(res, true, 'edit file name success', file)           
    })
}
