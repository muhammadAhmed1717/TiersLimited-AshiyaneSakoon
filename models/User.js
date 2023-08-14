const mongoose=require('mongoose');
const UserSchemea=mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    arrivalTime:{
        type:String
    },
    arrivalDate:{
        type:String
    },
    departureTime:{
        type: String
    },
    departureDate:{
        type:String
    },
    childs:{
        type: String,
    },
    adults:{
        type: String,
    },
    booked_room:{
        type: String,
    },
    status:{
        type:String
    }
});

module.exports=mongoose.model("User",UserSchemea);