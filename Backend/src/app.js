const express = require ("express");
const authRoutes = require ("./routes/routes");
const cookieparser = require("cookie-parser");
const cors = require("cors");

const app=express();

app.use(cors({
    origin: "https://gym-booking-slot-seven.vercel.app",
    credentials: true
}));

app.use(express.json());
app.use(cookieparser());

app.use("/api/auth",authRoutes);

module.exports = app;
