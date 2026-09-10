const bookingModel = require("../models/booking.model");

const getAllBookings = async (req, res) => {
    try {

        const bookings = await bookingModel
            .find()
            .populate("user", "name email")
            .populate("class");

        return res.status(200).json({
            message: "Bookings retrieved successfully",
            bookings
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error retrieving bookings",
            error: error.message
        });
    }
};

module.exports = { getAllBookings };