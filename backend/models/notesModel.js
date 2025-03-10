const mongoose=require("mongoose")
const Schema =mongoose.Schema;

const noteSchema=new Schema({

title:{type:String,required:true},
content:{type:String,required:true},
tags:{type:[String],default:[]},
userId:{type:String,required:false},
isPinned:{type:Boolean,default:false},

});
const  Notes = mongoose.model('Notes', noteSchema);
module.exports = Notes;