const express = require("express");
const authcontroller = require("../controllers/auth.controller");
const classController = require("../controllers/class.controller");
const roleMiddleware = require("../Middleware/role.Middleware");
const authMiddleware = require("../Middleware/auth.Middleware");




const router = express.Router()


router.post("/register",authcontroller.registerUser);
router.post("/login",authcontroller.loginUser);
router.post("/logout",authcontroller.logoutUser);
router.post("/create",authMiddleware,roleMiddleware("trainer"), classController.createClass)
router.get("/get",authMiddleware,classController.getAllClass)
router.get("/get/:id",authMiddleware,classController.getSingleClass)
router.put("/update/:id",authMiddleware,roleMiddleware("trainer"),classController.updateClass)
router.delete("/delete/:id",authMiddleware,roleMiddleware("trainer"),classController.deleteClass)


module.exports =router;
