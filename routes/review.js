const express = require("express");
const router = express();
const reviews= require('../controllers/c_review');
// FUNCTION TO POST REVIEW 
router.post('/',reviews.postReview);
// FUNCTION TO CONTACT HOTEL
router.post('/contact',reviews.postContact);
// FUNCTIOJ TO SEE THE REVIEWS OR CONTACT
router.get('/', reviews.getall);
module.exports = router;