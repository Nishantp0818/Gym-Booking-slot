require("dotenv").config();
const app = require("./src/app");
const connectDB =require("./src/db/db");
const cookieParser = require("cookie-parser");

app.use(cookieParser());


const PORT = process.env.PORT

connectDB()

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});