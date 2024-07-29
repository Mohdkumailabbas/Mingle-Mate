const mongoose = require('mongoose');
const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        minlength:3,
        maxlength:15
    },
    password:{
        type:String,
        required:true,
        minlength:7
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:7,
        maxlength:50
    },
    isAvatarSet:{
        type:Boolean,
        default:false
    },
    isAvatarImage:{
        type:String,
        default:false
    }
})
module.exports =mongoose.model('Users',userSchema);