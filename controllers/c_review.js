const Contact = require("../models/Contact");
const User = require("../models/User");
// FUNCTION TO POST REVIEW
exports.postReview = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.postedBy });
        console.log("user",user)
        if (user) {
            const review = new Contact({
                postedby: req.body.postedBy,
                description: req.body.description,
                category: "review",
            });
            await review.save();
            res.json("Review Posted")
        }
        else{
            res.json("Can't Post Review")
        }
    } catch (err) {
        res.json(err);
    }
};
// FUNCTION TO CONTACT HOTEL
exports.postContact = async (req, res) => {
    try {
        console.log(req.body.postedBy);
        const review = new Contact({
            postedby: req.body.postedBy,
            description: req.body.description,
            category: "contact",
        });
        await review.save();
        res.json("Message Send")
    } catch (err) {
        res.json(err);
    }
};

// FUNCTIOJ TO SEE THE REVIEWS OR CONTACT
exports.getall = async (req,res) => {
    try {
        const review = await Contact.find();
        res.json(review);
    } catch (err) {
        res.json(err)
    }
}