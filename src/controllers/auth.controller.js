const userModel =require("../models/user.model");   
const bcrypt = require("bcrypt");



const registerUser =async(req,res)=>{

    try{
        const{name, email, contact, password} =req.body;

     // check required field 
     if(!name || !email || !contact || !password)
        return res.status(400).json({
       message: "All fields are required"
        });

      // check the existing one 
      
      const existingUser =await userModel.findOne({email});

     if(existingUser){
        return res.status(400).json({
            message:"User already exists"
        });
     }
     //create user 
     const user =await userModel.create({
        name, email, contact, password
     });
     return res.status(201).json({
        message:"User registered successfully",
        user
     })

    }catch(error){
         res.status(500).json({
            message: "Internal server error",
            error:error.message
         })
    }
}

// // for login 
// const loginUser= async(req,res)=>{

//    try{
//       if(email===user.req)
//          return res.status(400).json({
//        message: "Successfully login"
//          })
//    }

// }

module.exports =registerUser;