const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require("dotenv").config();
const { check, validationResult } = require('express-validator');
const User = require('../models/User')
let exp = {};

// exp.signup = async(req,res)=>{
//     try {
//         console.log(req.body)
//         res.json({status:'ok'})
//     } catch (err) {
//         console.log(err)
//     }
// }

exp.signup = ([
    check("name", "Enter a valid Name").exists(),
    check("email", "Enter a valid Email").not().isEmail(),
    check("password", "Password is required").exists(),
    check("age", "age is required").exists(),
    check("gender", "gender is required").exists(),

], async(req,res)=>{
    try {
            console.log(req.body)
            const errors = validationResult(req);
            console.log(errors)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            let {name,email,age,mobileNumber, password, gender} = req.body
            let existing = await User.find({email})
            console.log(existing)
            if(existing.length){
                console.log('User already exists')
                return res.send({success:false, msg: 'User already exists'})
            }
            let id_obj = await User.find({}, { userID: 1, _id: 0 })
                .sort({ userID: -1 })
                .limit(1);
            let userID = 500000;
            if (id_obj[0]) {
            userID = id_obj[0].userID + 1;
            }
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);
            const newUser = new User({
                userID,
                name,
                age,
                email,
                mobileNumber,
                password,
                gender,
            })

            await newUser.save();
            console.log('User registered')
            return res.send({
                success: true,
                msg: 'Registered Successfully!',
            });

        } catch (err) {
            console.log(err)
            return res.send({success: false, msg:"check console"})
        }
})

exp.login = async(req,res)=>{
    try {
        const {email, password} = req.body
        console.log(email)
        var user
        if(email.includes('@')){
            user = await User.findOne({email}).lean()
        }else{
            mobileNumber = email
            user = await User.findOne({mobileNumber}).lean()
        }
        
        if(!user){
            console.log('User not found')
            return res.send({success: false, msg: 'Invalid Credentials'})
        }else{
            console.log('User found')
        }

        if(await bcrypt.compare(password, user.password)){
            console.log('Password matched')
            const token = jwt.sign({
                name: user.name,
                email: user.email,
                userID:user.userID 
            },process.env.JWT_secret, {
                expiresIn: "1200s"
            })

            res.cookie('token', token)
            return res.send({success: true, data:token})
        }else{
            console.log('Password incorrect')
            return res.send({success: false, msg: "Invalid credentials"})
        }

    } catch (err) {
        console.log(err)
        return res.send({success: false, msg: "check console"})
    }
}

exp.logout = async(req,res)=>{
    try {
        res.clearCookie('token');
        return res.redirect('/')
    } catch (err) {
        console.log(err)
    }
}

module.exports = exp