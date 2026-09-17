const express = require ("express");
const authRoutes = require ("./routes/routes");
const cookieparser = require("cookie-parser");
const cors = require("cors");

const app=express();

const allowedOrigins = [
    "https://gym-booking-slot-seven.vercel.app",
    "https://gym-booking-slot-git-main-nishant-9028.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

app.use(express.json());
app.use(cookieparser());

app.use("/api/auth",authRoutes);

module.exports = app;
