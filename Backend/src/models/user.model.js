const mongoose =require("mongoose");


const userSchema = new mongoose.Schema({

name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true
},
contact:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
role:{
    type:String,
    enum:["member","trainer","admin"],
    default:"member"
}


});

const userModel =mongoose.model("user",userSchema)

module.exports= userModel;
