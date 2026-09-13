const classModel = require ("../models/class.model");
const bookingModel = require("../models/booking.model");


const createClass = async(req, res)=>{

    try{
   
    const {name, category, description, image, date, time,totalSlots} = req.body;

    if(!name || !category || !description || !image ||! date ||! time ||!totalSlots){
        return res.status(400).json({
            message:"All fields are required"
        });
    }

    const trainer = req.user.id;
    const  availableSlots =totalSlots;

    const createdClass = await classModel.create({
        name, category, description, image, trainer, date, time, totalSlots,availableSlots
    })

      
    res.status(201).json({
        message: "Class created succefully"
 
    })
}catch(error){
    res.status(500).json({
        message:"Internal server error",
        error:error.message
    })
}
}
   // Get all classes
const getAllClass = async(req, res)=>{
     try{

        const getClasses = await classModel.find();

         res.status(200).json({
            message: "All classes fetched successfully",
            getClasses
         })
     }catch(error){
        res.status(500).json({
            message: "Internal server error"
             

        });
     };

};

const getSingleClass = async(req, res)=>{

    try{
  const id = req.params.id;

    const singleClass =await classModel.findById(req.params.id);

    if(!singleClass){
        return res.status(404).json({
            message:"There is no class for your search"
        })
    }
      res.status(200).json({
        message:"Your Class",
        singleClass
      })

    }catch(error){
        res.status(500).json({
            message:"error"
        })
    }
};
 

// Update Class
const updateClass = async (req, res) => {
  try {
    const update = await classModel.findById(req.params.id);

    if (!update) {
      return res.status(404).json({
        message: "Class not found",
      });
    }

    // Check class owner
    if (update.trainer.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    // Count active bookings
    const activeBookings = await bookingModel.countDocuments({
      class: req.params.id,
      status: "Active",
    });

    // New total slots
    const newTotalSlots =
      req.body.totalSlots !== undefined
        ? Number(req.body.totalSlots)
        : update.totalSlots;

    // New total slots cannot be less than existing bookings
    if (newTotalSlots < activeBookings) {
      return res.status(400).json({
        message: `Total slots cannot be less than active bookings (${activeBookings})`,
      });
    }

    // Calculate available slots
    const newAvailableSlots = newTotalSlots - activeBookings;

    const updated = await classModel.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        totalSlots: newTotalSlots,
        availableSlots: newAvailableSlots,
      },
      {
         returnDocument: "after"
      }
    );

    return res.status(200).json({
      message: "Successfully updated",
      updated,
    });

  } catch (error) {
    console.error("Update class error:", error);

    return res.status(500).json({
      message: "Error updating class",
      error: error.message,
    });
  }
};

// Delete

const deleteClass =async(req, res)=>{
     
    try{
    const classToDelete = await classModel.findById(req.params.id)
     if(!classToDelete){
        return res.status(404).json({
            message:" class not found"
        })
     };

     if(classToDelete.trainer.toString()!==req.user.id)
        return res.status(403).json({
      message:" unauthorized"
    });

    const deleted = await classModel.findByIdAndDelete(req.params.id);
     
     res.status(200).json({
        message:"Class Delete",
        deleted
     })

}catch(error){
    res.status(500).json({
        message: "error"
    })
}
    
}

module.exports = {createClass , getAllClass, getSingleClass, updateClass, deleteClass};
