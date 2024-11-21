const mongoose=require("mongoose")
const Schema =mongoose.Schema;

const userSchema=new Schema({

fullname:{type:String},
email:{type:String},
password:{type:String},
});
const  Users = mongoose.model('user', userSchema);
module.exports = Users;