const mongoose = require('mongoose')

const ModelSchema = mongoose.Schema

const UserModel = new ModelSchema({

email:{type:String , required:true , unique:true },
password:{type:String , required:true , minlength:5},
displayName:{type:String}
}) 

module.exports = mongoose.model("user" , UserModel)