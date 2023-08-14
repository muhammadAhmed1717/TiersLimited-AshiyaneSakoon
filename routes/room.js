const express = require("express");
const router = express();
const rooms = require("../controllers/c_room");
const Room = require("../models/Room")
// router.get("/", users.getUser);
// FUNCTION TO ADD ROOM
router.post("/", rooms.addRoom);
// FUNCTION TO VIEW ROOM
router.get("/", rooms.getRoom);
// FUNCTION TO VIEW A SPECIFIC ROOM BY ROOM NO
router.get("/:roomno", rooms.getRoombyNo);
// FUNCTION TO GET ROOM BY PREFERENCES
router.get("/pref/:capacity/:type", rooms.PrefrenceRooms);
// router.get("/history", rooms.history);
module.exports = router;
