const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    userID:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    mobileNumber: {
        type: String
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    rides: [Number]
})

module.exports = User = mongoose.model('User', UserSchema);