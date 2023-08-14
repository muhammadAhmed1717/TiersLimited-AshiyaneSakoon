const nodemailer = require('nodemailer');
require('dotenv/config');
const password=process.env.APP_PASSWORD;
let transporter= nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:"muhammedahmed4023@gmail.com",
        pass:password
    }
})
module.exports={transporter}