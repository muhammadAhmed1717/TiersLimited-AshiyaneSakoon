const express= require('express')
const router= express();
// const verifymanager = require("../Middleware/verifymanager")
const managers = require("../controllers/c_manager");
router.get('/dashboard',managers.dashboard);
// FUNCTION TO APPROVE BOOKING OF USER
router.put('/approve/:id',managers.approveBooking);
// FUNCTION TO DECLINE BOOKING OF USER
router.put('/decline/:id',managers.declineBooking);
// FUNCTION TO SEE PENDING BOOKINGS
router.get('/pendingbookings',managers.pendingBookings);
// FUNCTION TO SEE APPROVED BOOKINGS
router.get('/approvedbookings',managers.approvedBookings);
// FUNCTION TO SEE FREE AND OCCUPIED BOOKINGS
router.get('/roomstatus',managers.getRooms);
module.exports = router;