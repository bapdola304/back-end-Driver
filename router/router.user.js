const express = require('express')
const userController = require('../controller/controller.user')
const verifyTokenAdmin= require('./authToken').verifyTokenAdmin
const verifyTokenUser= require('./authToken').verifyTokenUser
const userRouter = express.Router()

userRouter.post('/', userController.insertUser)
userRouter.post('/login', userController.login)
userRouter.get('/', verifyTokenAdmin, userController.getAllUser)
userRouter.get('/:id', verifyTokenAdmin, userController.getUserById)
userRouter.delete('/', verifyTokenAdmin, userController.deleteAllUser)
userRouter.delete('/:id', verifyTokenAdmin, userController.deleteUser)
userRouter.put('/', verifyTokenUser,userController.updateUser)

module.exports = userRouter
