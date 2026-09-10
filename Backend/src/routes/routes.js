const express = require("express");
const authcontroller = require("../controllers/auth.controller");
const classController = require("../controllers/class.controller");
const roleMiddleware = require("../Middleware/role.Middleware");
const authMiddleware = require("../Middleware/auth.Middleware");
const bookingController = require("../controllers/booking.controller");
const adminController = require("../controllers/admin.controller");
const adminBookingController = require("../controllers/adminbooking.controller");



const router = express.Router()


router.post("/register",authcontroller.registerUser);
router.post("/login",authcontroller.loginUser);
router.post("/logout",authcontroller.logoutUser);
router.post("/create",authMiddleware,roleMiddleware("trainer"), classController.createClass)
router.get("/get",authMiddleware,classController.getAllClass)
router.get("/get/:id",authMiddleware,classController.getSingleClass)
router.put("/update/:id",authMiddleware,roleMiddleware("trainer"),classController.updateClass)
router.delete("/delete/:id",authMiddleware,roleMiddleware("trainer"),classController.deleteClass)
router.post("/book",authMiddleware,roleMiddleware("member"),bookingController.createBooking)
router.put("/update-role/:id",authMiddleware,roleMiddleware("admin"),adminController.updateUser)
router.get("/get-bookings",authMiddleware,roleMiddleware("member"),bookingController.getMyBookings)
router.delete("/cancel-booking/:id",authMiddleware,roleMiddleware("member"),bookingController.cancelBooking)
router.get("/admin/bookings",authMiddleware,roleMiddleware("admin"),adminBookingController.getAllBookings)



module.exports =router;
