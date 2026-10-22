const { default: mongoose } = require("mongoose");
const booking=require("../models/Booking_data");
async function getBooking(req,res){
    try {
        const Bookingid=req.params.id;
        const userid=req.user.id;
        if(!mongoose.Types.ObjectId.isValid(Bookingid)){
                return res.status(400).json({message:"Invalid Event id"});
        }

        const data=await booking.find({
            _id:Bookingid,
            user:userid
        })

        if(!data){
            return res.status(404).json({message:"No Booking is there"});
        }

        return res.status(200).json({messsage:"Booking Details",Booking_Data:data});    
        }
    catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"});
    }
}
module.exports=getBooking;