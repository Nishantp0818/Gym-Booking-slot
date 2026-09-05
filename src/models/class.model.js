const mongoose = require("mongoose");


const classSchema =  new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    trainer:{
    type: mongoose.Types.ObjectId,
    ref:user,
    required: true,

    },
    category:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required: true,
    },
     image:String
});
    const classModel = mongoose.model("class", classSchema)

    module.exports =classModel;