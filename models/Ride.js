const mongoose = require('mongoose');

const RideSchema = new mongoose.Schema({
    rideID:{
        type:Number,
        required:true,
        unique:true
    },
    pickupPoint: {
        type:String,
        required: true
    },
    destination:{
        type:String,
        required:true
    },

    totalPrice:{
        type: Number
    },

    distance: {
        type:Number
    },

    rideInitiator: {
        type: Number,
        required: true
    },

    bookingDate: {
        type:Date,
        default : Date.now
    },

    travelDate: {
        type: Date,
    },
    
    numberOfPeople : {
        type:Number,
        required: true
    },

    bookingConfirmation: {
        type:Boolean,
        default:false
    },

    users: [Number],

    modeOfTransport: {
        type: String,
        enum: ['Sedan', 'Hatchback', 'SUV', 'Premium'],
        default: 'Sedan'
    },

    pending : {
        type: Boolean,
        defualt: false
    }
})

module.exports = Ride = mongoose.model('Ride', RideSchema);