const express = require("express");
const register = require('./register')
const profile = require('./profile')
const User = require('../models/User')
const Ride = require('../models/Ride')
const ride = require('./ride')
const auth = require('../middleware/auth')
const router = express.Router();


router.get('/', (req,res)=> {
    res.render('registration')
})


router.get('/profile', auth, profile.viewRides, async (req,res)=> {
    res.render('profile', {token : req.token, user:req.user, rides: req.rides})
})

router.get('/newride', auth, ride.viewRides, (req,res)=> {
    res.render('newRide', {token : req.token, rides : req.rides})
})

router.get('/filtered', auth, ride.filterRide)
//login and register routes
router.post("/api/signup", register.signup)
router.post("/api/login", register.login)
router.get("/api/logout", register.logout)

//profile routes
router.post('/api/editprofile', auth, profile.editProfile)
router.post('/api/deleteride', auth, profile.deleteRide)

//ride routes
router.post('/api/joinride', auth, ride.joinExistingRide)
router.post('/api/newRide', auth, ride.requestRide)

module.exports = router;
