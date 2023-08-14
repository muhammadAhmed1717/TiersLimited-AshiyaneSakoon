const mongoose=require('mongoose');
const ContactSchemea=mongoose.Schema({
    postedby:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    category:{
        type: String
    }
});

module.exports=mongoose.model("Contact",ContactSchemea);