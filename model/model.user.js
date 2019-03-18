const mogoose = require('mongoose')
const Schema = mogoose.Schema;
var userSchema = new Schema({
    username: String,
    password: String,
    admin: Boolean
})
module.exports = mogoose.model('user', userSchema)