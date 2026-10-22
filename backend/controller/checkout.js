const booking=require("../models/Booking_data");
const mongoose=require("mongoose");
const Seat=require("../models/seat");
const Event=require("../models/event");
async function checkout(req,res){
    try {
        const userid=req.user.id;
        const{eventid,seatid}=req.body;

        if(!mongoose.Types.ObjectId.isValid(eventid)){
            return res.status(400).json({message:"Invalid Event id"});
        }

        if(!Array.isArray(seatid)||seatid.length==0){
            return res.status(400).json({message:"Please Select Atleast one event"});
        }
        
        const uniqueseat=[...new Set(seatid.map(String))];
       
        if(uniqueseat.length!==seatid.length){
            return res.status(400).json({message:"Duplicate Seats are not allowed"})
        }

        const event=await Event.findById(eventid);

        if(!event){
            return res.status(404).json({message:"Event not Found"});
        }

        const now=new Date()
        const seat=await Seat.find({
            _id:{$in:uniqueseat},
            event:eventid,
            status:"held",
            heldBy:userid,
            holdExpiresAt:{$gt:now},
        })

        if(seat.length!==uniqueseat.length){
            return res.status(409).json({message:"One or more seats are unavailable or their hold has expired"})
        }
        const totalamount=seat.reduce(
            (total,Seatprice)=>total+Seatprice.price,0
        );

        const Booking = await booking.create({
            user: userid,
            event: eventid,
            seats: seat.map(seatprice => ({
                seatId: seatprice._id,
                seatNumber: seatprice.seatNumber,
                price: seatprice.price
            })),
            totalAmount:totalamount,
            status: "pending",
            paymentStatus: "pending"
        });
        
        return res.status(201).json({message:"Booking created Successfully.Proceed to payment",data:Booking});

    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server error"});
    }
}
module.exports=checkout;