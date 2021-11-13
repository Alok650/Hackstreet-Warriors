const User = require('../models/User')
const Ride = require('../models/Ride')
let exp = {};

exp.requestRide = async(req,res)=> {
    try{
        let {pickupPoint,
        destination,
        travelDate, 
        modeOfTransport,
        numberOfPeople} = req.body

        //bookingDate=Date.now() 
        // convert date here
        numberOfPeople = parseInt(numberOfPeople)
        // return res.send({success: true, msg:typeof(numberOfPeople)})
        const userID = req.token['userID']
        const user = await User.findOne({userID: userID})
        if(!user){
            return res.send({success: false, msg: "User not found"})
        }


        let id_obj = await Ride.find({}, { rideID: 1, _id: 0 })
                .sort({ rideID: -1 })
                .limit(1);
            let rideID = 12000000;
            if (id_obj[0]) {
            rideID = id_obj[0].rideID + 1;
            }

        

        const users = [userID]
        const newRide = new Ride({
            rideID,
            pickupPoint,
            destination,
            rideInitiator : userID,
            travelDate,
            users,
            numberOfPeople,
            modeOfTransport,
        })
        
        var registered = await newRide.save()
        console.log(registered)
        if(registered){
            var rides = user.rides
            rides.push(rideID)
            await User.updateOne({userID},{$set: {rides}} )
        }
        return res.send({
            success: true,
            msg: 'Ride added successfully!',
        });
    }catch(err){
        console.log(err)
        //check enum error
        //  if(err.)
        return res.send({
            success: false,
            msg: 'Internal Server Error',
        });
    }

    //const user=req.cookies['token']

}

exp.joinExistingRide = async(req,res) => {
    try {
        const {rideID} = req.body
        const userID = req.token['userID']
        const findRide = await Ride.findOne({rideID})
        if(!findRide){
            return res.send({success:false, msg: 'Ride is not available or has already been deleted!'})
        }
        
        const user = await User.findOne({userID})
        if(user.rides.includes(rideID)){
            return res.send({msg: `Youve already joined ride ${rideID}, check your profile`, success: false})
        }
        var rideupdate = await User.updateOne({userID}, {$push: {"rides" : rideID}})
        if(rideupdate){
            await Ride.updateOne({rideID}, {$push: {"users" : userID}})
        }
       
        return res.send({success: true, msg:"Ride succesfully added"})

    } catch (err) {
        console.log(err)
        return res.send({
            success: false,
            msg: 'Internal Server Error',
        });
    }
}

exp.viewRides = async(req,res,next) => {
    try {
        var allrides = await Ride.find({})
        const rides = []
        var users = {}
        for(let i=0; i<allrides.length; i++){
            temp = {}
            if(req.token.userID == allrides[i].rideInitiator){
                continue
            }
            if(allrides[i].rideInitiator in users){
                allrides[i].initiatorName = user.rideInitiator
            }else{
                var curUser = await User.findOne({userID: allrides[i].rideInitiator})
                users.rideInitiator = curUser.name
                allrides[i].initiatorName = curUser.name
            }
            // allrides[i].travelDate = allrides[i].travelDate
            rides.push(allrides[i])
        };
        
        req.rides = rides
        next()
    } catch (err) {
        console.log(err)
        return res.send({
            success: false,
            msg: 'Internal Server Error',
        });
    }
}

exp.filterRide = async(req,res) => {
    const { date } = req.query;
    console.log('hello', date)
    console.log(new Date(date))
    var lowerDate = new Date(date)
    lowerDate.setDate(lowerDate.getDate() -1)
    var higherDate = new Date(date)
    higherDate.setDate(higherDate.getDate() );
    console.log(higherDate,lowerDate)
    var allrides = await Ride.find({"travelDate" : {"$gte": lowerDate, "$lt": higherDate}})
        const rides = []
        var users = {}
        for(let i=0; i<allrides.length; i++){
            temp = {}
            if(req.token.userID == allrides[i].rideInitiator){
                continue
            }

            if(allrides[i].rideInitiator in users){
                allrides[i].initiatorName = user.rideInitiator
            }else{
                var curUser = await User.findOne({userID: allrides[i].rideInitiator})
                users.rideInitiator = curUser.name
                allrides[i].initiatorName = curUser.name
            }
            // allrides[i].travelDate = allrides[i].travelDate
            rides.push(allrides[i])
        };
    res.render('newRide', {token : req.token, rides : rides})
}


module.exports = exp