const jwt = require("jsonwebtoken");

const authMiddleware =(req,res,next)=>{

try{
     const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message: "Invalid user "
        });
    }
    
      const decode= jwt.verify(token,process.env.JWT_SECRET);
      
     req.user= decode
   
     next()
   
}catch(error){
    res.status(401).json({
        message:"Invalid or expired token",
        error:error.message
    })
}

}

module.exports=authMiddleware;
