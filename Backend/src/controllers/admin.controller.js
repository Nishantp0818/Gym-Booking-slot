const userModel = require("../models/user.model");

     const updateUser= async(req, res) => {
     try{

        const user = await userModel.findById(req.params.id);

        if(!user){
            return res.status(404).json({
                message: "User not found "
            });
        }
            

        if(user.role ==="trainer"){
            return res.status(400).json({
                message: "User is already a trainer"
            });
        }
        if(user.role ==="admin"){
            return res.status(400).json({
                message: "admin cannot be updated to trainer"
            });
        }

         const  trainer = await userModel.findByIdAndUpdate(req.params.id, {role: "trainer"}, {new: true});
        return res.status(200).json({
            message: "User updated successfully",
            user: trainer
        }); 

    }catch(error){
        return res.status(500).json({
            message: "Error updating user",
            error: error.message
        });
    }
};

module.exports = { updateUser };