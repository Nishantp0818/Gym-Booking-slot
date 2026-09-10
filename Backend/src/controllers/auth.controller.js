const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// To register the user
const registerUser = async (req, res) => {

   try {
      const { name, email, contact, password} = req.body;

      // check required field 
      if (!name || !email || !contact || !password)
         return res.status(400).json({
            message: "All fields are required"
         });

      // check the existing one 

      const existingUser = await userModel.findOne({ email });

      if (existingUser) {
         return res.status(400).json({
            message: "User already exists"
         });
      }
      // password hashing

      const hashedPassword = await bcrypt.hash(password, 10);
         // user create
       const user = await userModel.create({
         name, email, contact, password: hashedPassword
      });
       
      // JWT 
      const token =jwt.sign({
         id:user._id,
         role:user.role},
          process.env.JWT_SECRET,{
            expiresIn:"7d"
          });
       res.cookie("token",token,{
         httpOnly: true,
         maxAge:7*24*60*60*1000
       })

      return res.status(201).json({
         message: "User registered successfully",
         user
      })

   } catch (error) {
      res.status(500).json({
         message: "Internal server error",
         error: error.message
      })
   }
}

// for login 
const loginUser = async (req, res) => {

   try {
      const { email, password } = req.body;

      //check required field  
      if (!email || !password)
         return res.status(400).json({
            message: "All fields are required"
         });
      //find the user 

      const user = await userModel.findOne({ email })
      //email not found 
      if (!user) {
         return res.status(404).json({
            message: "User not found"
         })
      }
      // compare the password 
      const isMatch = await bcrypt.compare(password, user.password)
      //password is invalid 
      if (!isMatch) {
         return res.status(401).json({
            message: "Invalid Password"
         });
      }
      //Jwt 
      const token = jwt.sign({
         id: user._id,
         role: user.role
      }, process.env.JWT_SECRET, {
         expiresIn: "7d"
      })
        // this code is to storage the token
      res.cookie("token", token,{
         httpOnly: true,
         //  secure: true,
         //  sameSite: "none",
         maxAge: 7*24*60*60*1000
      });

      // login successfully
      return res.status(200).json({
         message: " Login successfully",
         token
      });


   } catch (error) {
      res.status(500).json({
         message: " Internal server Error",
         error: error.message
      })
   }
}
// To logout

const logoutUser = async(req,res)=>{
   try{
      res.clearCookie("token",{
         httpOnly: true,
         secure: false,
         sameSite:"lax",
      });
      return res.status(200).json({
         message: "Logout successfully"
      });
   }catch(error){
      res.status(500).json({
        message: "Internal server error",
        
      });
   }

}

module.exports = { registerUser, loginUser , logoutUser};
