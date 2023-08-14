const Room = require("../models/Room");
const User = require("../models/User");
const { date, time } = require("../middleware/DateTime");
require('dotenv/config');
const key=process.env.STRIPE_KEY;
var stripe = require("stripe")(key);
// const checkout =require("../Middleware/Stripe");
// FUCTION TO VIEW ALL USERS
exports.viewUser = async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (err) {
        res.json(err);
    }
};
// FUCTION TO VIEW SPECIFIC USERS
exports.getUser = async (req, res) => {
    try {
        const user = await User.find({ email: req.params.email });
        res.json(user);
    } catch (err) {
        res.json(err);
    }
};
// FUNCTION TO VIEW AVAILABLE ROOMS
exports.viewRoom = async (req, res) => {
    try {
        const room = await Room.find({ status: true });
        res.json(room);
    } catch (err) {
        res.json(err);
    }
};
// FUNCTION TO BOOK ROOM
exports.bookRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
            childs: req.body.childs,
            adults: req.body.adults,
            booked_room: room.room_no,
            status: "pending",
        });
        await user.save();
        res.json("User Created Successfully");
    } catch (err) {
        res.json(err);
    }
};
// FUNCTION TO CHECK IN TO ROOM
exports.checkIn = async (req, res) => {
    try {
        console.log("Date: ", date);
        console.log("Time: ", time);
        let user = await User.findOne({ email: req.body.email });
        user.arrivalTime = time;
        user.arrivalDate = date;
        await user.save();
        res.json("Checked In");
    } catch (err) {
        res.json(err);
    }
};
// FUNCTION TO CHECK OUT FROM ROOM
exports.checkOut = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        user.departureTime = time;
        user.departureDate = date;
        user.status = "checked out";
        await user.save();
        let room = await Room.findOne({ room_no: user.booked_room });
        let history = room.history;
        history.push(user);
        room.history = history;
        await room.save();
        res.json("Checked Out");
    } catch (err) {
        res.json(err);
    }
};
// FUNCTION TO GENERATE CHALLAN
exports.createCheckoutSession = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "pkr",
                        product_data: {
                            name: "Room No: " + room.room_no,
                            //   images:['https://bd.gaadicdn.com/processedimages/yamaha/mt-15-2-0/source/mt-15-2-062e4b1d700b63.jpg?tr=w-375'],
                        },
                        unit_amount: 200000 * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `https://ashiyane-sakoon-tiers-finalproject.netlify.app/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: "https://ashiyane-sakoon-tiers-finalproject.netlify.app/failure",
        });

        res.json({ url: session.url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// FUNCTION TO CONFIRM PAYMENT STATUS

exports.confirmPayment = async (req, res) => {
    const sessionId = req.params.sessionId;

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const paymentStatus = session.payment_status;
        console.log(paymentStatus);
        res.json({ paymentStatus });
    } catch (error) {
        console.error("Error retrieving session:", error);
        res.status(500).json({ error: "Error retrieving session" });
    }
};

// // FUNTION TO ADD USER
// exports.registerUser =  async (req,res) => {
//     try {
//         const user = new User({
//             name:req.body.name,
//             email:req.body.email,
//             contact:req.body.contact,
//             childs:req.body.childs,
//             adults:req.body.adults,
//             status:"pending"
//         })
//         await user.save();
//         res.json(user);
//     } catch (err) {
//         res.json(err)
//     }
// }
