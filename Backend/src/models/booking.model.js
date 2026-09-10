const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },

    class: {
        type: mongoose.Types.ObjectId,
        ref: "class",
        required: true
    },

    status: {
        type: String,
        enum: ["Active", "Cancelled"],
        default: "Active"
    }
}, {
    timestamps: true
});

const bookingModel = mongoose.model("booking", bookingSchema);

module.exports = bookingModel;