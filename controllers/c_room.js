const Room = require("../models/Room");
const Employee = require("../models/Employee");
// const Post = require("../Models/Post");
// FUNCTION TO GET ROOM
exports.getRoom = async (req, res) => {
    try {
        const room = await Room.find();
        console.log("Lenght: ", room.length);
        res.json(room);
    } catch (err) {
        res.json(err);
    }
};
// FUNCTION TO ADD ROOM
exports.addRoom = async (req, res) => {
    try {
        const servant = await Employee.findOne({ name: req.body.servantname });
        if (servant) {
            const availablerooms = await Room.find();
            const room = new Room({
                room_no: availablerooms.length + 1,
                room_type: req.body.roomtype,
                servant_name: req.body.servantname,
                servant_contact: servant.contact,
                room_price: req.body.roomprice,
                room_description: req.body.roomdescription,
                capacity: req.body.capacity,
                room_image: req.body.image,
            });
            await room.save();
            res.json("Room Created Successfully");
        } else {
            res.json("Employee Don't Exists");
        }
    } catch (err) {
        res.json(err);
    }
};
// FUNCTION TO GET ROOM BY ROOM NO
exports.getRoombyNo = async (req, res) => {
    try {
        const room = await Room.findOne({ room_no: req.params.roomno });
        res.json(room);
    } catch (err) {
        res.json(err);
    }
};
// FUNCTION TO GET ROOM BY PREFERENCES
exports.PrefrenceRooms = async (req, res) => {
    try {
        const roomarr = [];
        const room = await Room.find();
        // console.log(room);
        room.forEach((element) => {
            if (element.capacity === req.params.capacity) {
                if (element.room_type === req.params.type) {
                    roomarr.push(element);
                }
            }
        });
        console.log("Array: ", roomarr);
        res.json(roomarr);
    } catch (err) {
        res.json(err);
    }
};
// exports.PrefrenceRooms = async (req, res) => {
//     console.log("IN FUNCTION")
//     try {
//         const { type, capacity } = req.body;
//         console.log("Type: ",type)
//         console.log("Capacity: ",capacity)
//         const rooms = await Room.find({ room_type: type, capacity: capacity });

//         res.json(rooms);
//     } catch (err) {
//         res.json(err);
//     }
// }

// exports.history = async (req, res) => {
//     try {
//         const roomsWithHistory = await Room.find().populate("history");
//         res.json(roomsWithHistory);
//     } catch (err) {
//         console.log(err);
//     }
// };
