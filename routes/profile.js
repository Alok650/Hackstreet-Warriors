const User = require('../models/User')
const Ride = require('../models/Ride');
let exp = {};

exp.editProfile = async(req,res)=>{
    try {
        const {name, mobileNumber, email} = req.body;
        console.log(req.body)
        //return res.send({msg: "Hello", success: true})
        console.log(req.token)
        if(mobileNumber == req.token.mobileNumber && email == req.token.email && name == req.name){
            return res.send({msg: "No changes made", success: false})
        }
        // const user = await User.findOne({email : req.token.email})
        // console.log(user)
        const query = await User.updateOne({email: req.token.email}, {$set: {name, mobileNumber, email}})
        //console.log(query.nModified)
        return res.send({msg: "Details edited successfully", success: true})
        // if(query.nModified){
        //     //res.clearCookie('token');
        //     return res.send({msg: "Details edited successfully", success: true})
        // }else{
        //     return res.send({msg: "No details edited", success:false})
        // }
        
        } catch (err) {
        console.log(err)
            return res.send({msg: "Internal Server Error", success:"false"})
    }
    

}

exp.viewRides = async(req,res,next)=> {
    try {
        const user = await User.findOne({email: req.token.email})
        if(!user){
            return res.send({success: false, msg:"User not found, Internal Server error"})
        }
        req.user = user
        const userID = req.token.userID
        const allrides = await Ride.find({$or: [{rideInitiator: req.token.userID}, {users:userID}] })
        console.log(allrides)
        const rides = []
        var users = []
        for(let i=0; i<allrides.length; i++){
            
            allrides[i].userDetails = []
            for(let j=0; j<allrides[i].users.length; j++){
                if (users.some(e => e.userID === allrides.users[j])) {
                   allrides[i].userDetails.push(users.find(({userID}) => userID == allrides.users[j]))
                }else{
                    temp = {}
                    var curUser =await User.findOne({userID : allrides[i].users[j] })
                    temp = {
                        userID: allrides[i].users[j],
                        age: curUser.age,
                        gender: curUser.gender,
                        mobileNumber : curUser.mobileNumber,
                        email : curUser.email,
                        name: curUser.name
                    }
                    allrides[i].userDetails.push(temp)
                }
            }
            
            // allrides[i].travelDate = allrides[i].travelDate
            rides.push(allrides[i])
        }
    
        //console.log(rides)
        req.rides = rides
        next()
    } catch (err) {
        console.log(err)
        return res.send({success:false, msg: "Internal Server Error"})
    }
    
}

exp.deleteRide = async(req,res) => {
    try {
        const {rideID} = req.body
        const userID = req.token.userID
        const ride = await Ride.findOne({rideID})
        console.log("hi", ride)
        if(userID == ride.rideInitiator){
            console.log(ride.users)
            for(let i=0; i<ride.users.length; i++){
                await User.updateOne({userID: ride.users[i]}, {$pull: {rides: rideID}})
            }
            //await Ride.updateOne({rideID}, {$pullAll: {users: ride.users}})\
            await Ride.deleteOne({rideID})
        }else{
            await User.updateOne({userID}, {$pull: {rides: rideID}})
            await Ride.updateOne({rideID}, {$pull: {users: userID}})
        }
        


        return res.send({success: true, msg: "Deleted ride successfully!"})
    } catch (err) {
        console.log(err)
        return res.send({
            success:false,
            msg:"Internal Server error"
        })
    }
}


module.exports = exp