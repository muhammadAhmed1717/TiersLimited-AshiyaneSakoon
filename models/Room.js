const mongoose=require('mongoose');
const RoomSchemea=mongoose.Schema({
    room_no:{
        type:String,
        required: true
    },
    room_type:{
        type:String,
        required:true
    },
    servant_name:{
        type:String,
        required:true
    },
    servant_contact:{
        type:String,
        required: true
    },
    room_price:{
        type: String,
        required: true
    },
    room_image:{
        type: [String]
    },
    room_description:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: true
    },
    capacity:{
        type: String
    },
    history:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ]
});

module.exports=mongoose.model("Room",RoomSchemea);