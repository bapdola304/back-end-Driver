const mogoose = require('mongoose')
const Schema = mogoose.Schema;
var fileSchema = new Schema({
    filename: String,
    userid: String,
    type:String
})
module.exports = mogoose.model('fileupload', fileSchema)