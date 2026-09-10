const { sendmail } = require("../services/email.service");
const userModel = require("../models/user.model");
const bookingModel = require('../models/booking.model');
const classModel = require('../models/class.model');

const createBooking = async (req, res) => {

    try{
      const { classId} = req.body;
      const userId = req.user.id;

        if(!classId){
            return res.status(400).json({
                message: "Class ID is required"
            });
        }

        const gymClass = await classModel.findById(classId);


        if (!gymClass) {
            return res.status(404).json({
                message: "Class not found"
            });
        }
        const user = await userModel.findById(userId);
        if (!user) {
    return res.status(404).json({
        message: "User not found"
    });
}

        const existingBooking = await bookingModel.findOne({ user: userId, class: classId, status: "Active" });
            
        if (existingBooking) {
            return res.status(400).json({
                message: " Class is already booked"
            });
        }
             // 5. Atomically reserve one slot
        const updatedClass = await classModel.findOneAndUpdate(
            {
                _id: classId,
                availableSlots: { $gt: 0 }
            },
            {
                $inc: { availableSlots: -1 }
            },
            {
                new: true
            }
        );

        // 6. If no slot was available
        if (!updatedClass) {
            return res.status(400).json({
                message: "No available slots for this class"
            });
        }

        const newBooking = await bookingModel.create({
            user: userId,
            class: classId
        });
        
             // Send confirmation email
        await sendmail(
            user.email,
            "Gym Class Booking Confirmation",
            `Your booking has been confirmed.

         Class: ${gymClass.name}
          Date: ${gymClass.date}
         Time: ${gymClass.time}

           Thank you for booking with us.`
          );

        res.status(201).json({
            message: "Booking created successfully",
            booking: newBooking
        });


    } catch (error) {
        return res.status(500).json({
            message: "Error creating booking",
            error: error.message
        });
    }
}
   //  Getting all bookings for the logged-in user

const getMyBookings = async (req, res) => {
   
    try{
        const userId = req.user.id;
        const bookings =await bookingModel.find({user: userId}).populate('class');


        res.status(200).json({
            message: "My bookings retrieved successfully",
            bookings: bookings
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error retrieving bookings",
            error: error.message
        });
    }
}
          
     // cancel booking for the logged-in user
   const cancelBooking = async (req, res) => {
    try{
        const bookingId = req.params.id;
        const userId = req.user.id;
        
        const booking = await bookingModel.findById(bookingId).populate('class');
        if(!booking){
            return res.status(404).json({
                message: "Booking not found"
            });
        }
         const gymClass = booking.class;
        if(booking.user.toString() !== userId){
            return res.status(403).json({
                message: "You are not the owner of this booking"
            });
        }
         
        if(booking.status === "Cancelled"){
            return res.status(400).json({
                message: "Booking is already cancelled"
            });
        }
        

         booking.status ="Cancelled";
         await booking.save();
        gymClass.availableSlots += 1;
        await gymClass.save();


        res.status(200).json({
            message: "Booking cancelled successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error cancelling booking",
            error: error.message
        });
    }
}

module.exports = {createBooking, getMyBookings, cancelBooking};
