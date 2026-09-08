const express = require ("express");
const authRoutes = require ("./routes/routes");
const cookieparser = require("cookie-parser");


const app=express();
app.use(express.json());
app.use(cookieparser());

app.use(express.json())

app.use("/api/auth",authRoutes);


module.exports = app;
