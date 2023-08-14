const mongoose=require('mongoose');
const EmployeeSchemea=mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    image:{
        type:String,
        default:"https://res.cloudinary.com/dxx1ymc6s/image/upload/v1690466178/z5wwouqvtujocjcbwmd6.png"
    },
    cnic:{
        type: String,
        required: true
    },
    contact:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    salary:{
        type: String,
        required: true
    }
});

module.exports=mongoose.model("Employee",EmployeeSchemea);