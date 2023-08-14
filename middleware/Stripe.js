// var stripe = require("stripe")("sk_test_51NdAciIdnqBrFYLIEURzIU4OQ3SJYTp8KnFvjsaolOwcKmTHylCLql32vwCVtGTvu12Z0PaTZSYy2iSXB6mjK5u600JkAtT42H");
// const Room = require("../Models/Room");
// const checkout = async (roomId) => {
//     const room = await Room.findById(roomId);
//     const session = await stripe.checkout.sessions.create({
//         payment_method_types: ["card"],
//         line_items: [
//             {
//                 price_data: {
//                     currency: "usd",
//                     product_data: {
//                         name: room.room_no,
//                         images: room.room_image,
//                     },
//                     unit_amount: 2500000,
//                 },
//                 quantity: 1,
//             },
//         ],
//         mode: "payment",
//         success_url: `http://localhost:3000/bookroom/?session_id={CHECKOUT_SESSION_ID}`,
//         cancel_url: "http://localhost:3000/",
//     });
//     req.session_id=session.CHECKOUT_SESSION_ID;
//     // return session.url;
//     next();
// };
// checkout().then((url)=>response.redirect(url))
// .catch((error)=>console.log(error))
