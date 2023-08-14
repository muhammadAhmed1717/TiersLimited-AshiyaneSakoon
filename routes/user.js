const express = require("express");
const router = express();
const users = require("../controllers/c_user");
const checkout=require('../middleware/Stripe');
// FUCTION TO VIEW ALL USERS
router.get('/viewuser',users.viewUser);
// FUCTION TO VIEW SPECIFIC USERS
router.get('/useremail/:email',users.getUser);
// FUNCTION TO BOOK A ROOM
router.post("/:id", users.bookRoom);
// FUNCTION TO VIEW AVAILABLE ROOM
router.get("/",users.viewRoom);
// FUNCTION TO CHECK IN TO ROOM
router.put("/checkin",users.checkIn);
// FUNCTION TO CHECK OUT FROM ROOM
router.put("/checkout",users.checkOut);
// FUNCTION TO GENERATE CHALLAN
router.get('/payment/:id',users.createCheckoutSession);
// FUNCTION TO CONFIRM PAYMENTS
// router.get('/confirmpayment/:sessionId',users.confirmPayment);
// FUNTION TO ADD USER
// router.post("/"registerUser)
// router.get("/",rooms.getRoom)
module.exports = router;