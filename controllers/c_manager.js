const User = require("../models/User");
const Room = require("../models/Room");
const { transporter } = require("../middleware/nodemailer");
// FUNCTION TO VIEW DASHBOARD
exports.dashboard = async (req, res) => {
    try {
        const rooms = await Room.find();
        const totalrooms = rooms.length;
        const available = await Room.find({ status: true });
        const availablerooms = available.length;
        const occupied = await Room.find({ status: false });
        const occupiedrooms = occupied.length;
        const pending = await User.find({ status: "pending" });
        const pendingbooking = pending.length;
        const approved = await User.find({ status: "approved" });
        const approvedbooking = approved.length;
        const totalbookings = pendingbooking + approvedbooking;
        let revenue = 0;
        const roomrevenue = await Room.find();
        roomrevenue.forEach((element) => {
            revenue = revenue + element.history.length * element.room_price;
        });
        const object = {
            totalrooms: totalrooms,
            availablerooms: availablerooms,
            occupiedrooms: occupiedrooms,
            pendingbooking: pendingbooking,
            approvedbooking: approvedbooking,
            totalbookings: totalbookings,
            revenue: revenue,
        };
        res.json(object);
    } catch (err) {
        res.json(err);
    }
};
// FUNTION TO APPROVE BOOKING
exports.approveBooking = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        user.status = "approved";
        await user.save();
        const room = await Room.findOne({room_no:user.booked_room});
        room.status = false;
        await room.save();
        const mailOptions = {
            from: `Ashiyana Sakoon <muhammadfaiz3635@gmail.com>`,
            to: user.email,
            subject: "Approved",
            html: `<p>Congratulations!!! Your Booking Have Been Approved By Our Officials</p>`,
        };
        transporter.sendMail(mailOptions,(error,info)=>{
            if (err) throw err
            else{
                console.log("email send");
            }
        })
        res.json("Booking Approved");
        // const mailOptions = {
        //     from: `Ashiyanae Sakoon <muhammadfaiz3635@gmail.com>`,
        //     to: user.email,
        //     subject: "Approved",
        //     html: `<p>Congratulations!!! Your Booking Have Been Approved By Our Officials</p>`,
        // };
        // transporter.sendMail(mailOptions,(error,info)=>{
        //     if (err) throw err
        //     else{
        //         console.log("email send");
        //     }
        // })
        // res.json(user);
    } catch (err) {
        res.json(err);
    }
};
// FUNTION TO DECLINE BOOKING
exports.declineBooking = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        user.status = "declined";
        await user.save();
        const room = await Room.findOne({room_no:user.booked_room});
        room.status = true;
        await room.save();
        const mailOptions = {
            from: `Ashiyana Sakoon <muhammadfaiz3635@gmail.com>`,
            to: user.email,
            subject: "Declined",
            html: `<p>Sorry!!! Your Booking Have Not Been Approved By Our Officials. Please Try Again</p>`,
        };
        transporter.sendMail(mailOptions,(error,info)=>{
            if (err) throw err
            else{
                console.log("email send");
            }
        })
        res.json("Booking Declined");
    } catch (err) {
        res.json(err);
    }
};
// FUNCTION TO SEE PENDING BOOKINGS
exports.pendingBookings = async (req, res) => {
    try {
        const user = await User.find({status:'pending'});
        res.json(user)
    } catch (err) {
        res.json(err);
    }
}
// FUNCTION TO SEE APPROVED BOOKINGS
exports.approvedBookings = async (req, res) => {
    try {
        const user = await User.find({status:'approved'});
        res.json(user)
    } catch (err) {
        res.json(err);
    }
}
// FUNCTION TO SEE FREE AND OCCUPIED ROOMS
exports.getRooms = async (req, res) => {
    try {
        console.log(req.query.status)
        const status = req.query.status === 'true';
        const room = await Room.find({status:status});
        res.json(room)
    } catch (err) {
        res.json(err);
    }
}
