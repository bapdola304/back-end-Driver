const express = require('express')
const mogoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const formidable = require('formidable')
const multer = require('multer')
const jwt = require('jsonwebtoken')
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;

///Mongoose connect
mogoose.connect('mongodb://localhost:27017/duyduong', { useNewUrlParser: true })
var db = mogoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connect to MongoDB success ..')
});

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(3000, (req, res) => {
    console.log('Server is conneting ....')
})

///Mongoose connect
mogoose.connect('mongodb://localhost:27017/duyduong', { useNewUrlParser: true })
var db = mogoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connect to MongoDB success ..')
});

app.use(morgan('dev'))
app.use('/user', require('./router/router.user'))
app.use('/file', require('./router/router.file'))




app.get('/test',(req, res)=>{
    res.send('hung ngu vl')
})