const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
require("dotenv").config();
module.exports = (req,res,next) => {
    //console.log(req)
    const token = req.cookies['token']
    console.log(token)
    try {
        if(!token){
            return res.send({success: false, msg: 'Authorization denied'})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("hello",decoded)
        req.token = decoded
        next()
    } catch (err) {
        console.log(err.name)
        if(err.name == 'TokenExpiredError'){
            return res.send({success:false, msg: "Your login session has expired, please login again"})
            //send to profile frontend for alert
        }
        return res.send({success: false, msg:"check auth middleware"})
    }
    
}