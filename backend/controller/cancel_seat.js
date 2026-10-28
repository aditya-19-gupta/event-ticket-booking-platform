const { default: mongoose } = require("mongoose");
const Booking=require("../models/Booking_data");
const Seat=require("../models/seat");

async function cancel_seat(req,res){
    try {
        const userid=req.user.id;
        const {seatId,bookingId}=req.body;
        if(!mongoose.Types.ObjectId.isValid(bookingId)){
            return res.status(400).json({message:"Invalid Event id"});
        }
        const booking = await Booking.findOne({_id: bookingId,user: userid});
        if(!booking){
            return res.status(400).json({message:"No Booking Found"});
        }

        if(booking.paymentStatus=="pending"){
            if(seatId!==undefined){
            if(!Array.isArray(seatId)||seatId.length==0){
                return res.status(400).json({message:"Please Select One Seat"});
            }
            const uniqueseat=[...new Set(seatId.map(String))];

            if(seatId.length!==uniqueseat.length){
                return res.status(400).json({message:"Duplicate Seat is not Allowed"});
            }
            const selectedseat=booking.seats.filter(seat=>
                uniqueseat.includes(seat.seatId.toString())
            );

            if(selectedseat.length!==uniqueseat.length){
                return res.status(400).json({message:"One or more seats does not belongs to this Booking"});
            }
            if (selectedseat.some(seat => seat.status === "cancelled")) {
                return res.status(400).json({
                    message: "One or more seats are already cancelled"
                });
            }
            const amountToDeduct = selectedseat.reduce((total, seat) => total + seat.price,0);

            selectedseat.forEach(seat=>{
                seat.status="Cancelled"
            });
            booking.totalAmount=Math.max(0,booking.totalAmount-amountToDeduct);

            await booking.save();

            
            const seat = await Seat.updateMany(
                {
                    _id: { $in: uniqueseat },
                    status: "held",
                    heldBy: userid,
                },
                {
                    $set: {
                        status: "available",
                        heldBy: null,
                        holdExpiresAt: null
                    }
                }
            );



            return res.status(200).json({message:"Seats are Cancelled",data:booking})
            }
   
        }

        else if(booking.paymentStatus=="paid"){
            if(seatId!=undefined){
                if(!Array.isArray(seatId)||seatId.length==0){
                    return res.status(400).json({message:"Please select One or More seats"});
                }
            }
            const uniqueseat=[...new Set(seatId.map(String))];
            if(seatId.length!==uniqueseat.length){
                return res.status(400).json({message:"Duplicate Seats are not allowed"});
            }

            const selectedseat=booking.seats.filter(seat=>
                uniqueseat.includes(seat.seatId.toString())
            )
            if (selectedseat.length !== uniqueseat.length) {
                return res.status(400).json({
                    message: "One or more seats do not belong to this booking"
                });
            }
            const amountToDeduct = selectedseat.reduce((total, seat) => total + seat.price,0);
            booking.refundedAmount+=amountToDeduct;
            booking.refundstatus="pending";

            selectedseat.forEach(seat=>{
                seat.status="Cancelled";
            })

            const seat=await Seat.updateMany(
                {
                    _id: { $in: selectedseat.map(seat => seat.seatId) },
                    event: booking.event,
                    status: "Booked",
                    heldBy: userid,
                },
                {
                    $set: {
                        status: "available",
                        heldBy: null,
                        holdExpiresAt: null
                    }
                }
            )
            return res.status(200).json({message:"Seats are Cancelled and Refund is intiatted ",refundamount:amountToDeduct});
        }
        
        else if(booking.paymentStatus=="failed"){
            return res.status(400).json({message: "Payment failed. Please verify payment status before cancellation."
        });
        }

        else if(booking.paymentStatus=="refunded"){
            return res.status(400).json({message: "This booking has already been refunded."});
        }
        const activeseat=booking.seats.filter(seat=>seat.status!=="Cancelled")

        if(activeseat.length==0){
            return res.status(400).json({message:"ALL seats are already cancelled"});
        }

        activeseat.forEach(seat=>
            seat.status="Cancelled"
        )
        booking.totalAmount=0;
        booking.status = "cancelled";
        await booking.save();
        const now = new Date();

        await Seat.updateMany(
            {
                _id: { $in: activeseat.map(seat => seat.seatId) },
                event: booking.event,
                status: "held",
                heldBy: userid,
            },
            {
                $set: {
                    status: "available",
                    heldBy: null,
                    holdExpiresAt: null
                }
            }
        );
        return res.status(200).json({messgae:"ALL seats are cancelled"});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
}
module.exports=cancel_seat;