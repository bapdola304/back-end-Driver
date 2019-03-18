const express = require('express')
const app = express()
const fileController = require('../controller/controller.file')
const fileUpload = require('express-fileupload');
const verifyTokenUser = require('./authToken').verifyTokenUser
const fileRouter = express.Router();
fileRouter.use(fileUpload())
// fileRouter.get('/', verifyTokenUser, fileController.getAllFile)
fileRouter.get('/',verifyTokenUser, fileController.getFileByUserId)
fileRouter.post('/',verifyTokenUser, fileController.inserFile)
// fileRouter.delete('/all', verifyTokenUser, fileController.deleteAllFile)
// fileRouter.delete('/', verifyTokenUser, fileController.deleteFile)

module.exports = fileRouter