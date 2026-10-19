const Seat=require("../models/seat");
const Event=require("../models/event");
const mongoose=require("mongoose");


async function delete_seat(req,res){
    try{

        const id=req.params.id;
        const userid=req.user.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message: "Invalid Seat ID"});}
        
        
        const seat=await Seat.findById(id);

        if(!seat){
            return res.status(400).json({message:"Bad request No seat is There"});
        }

        if (seat.status === "sold" || seat.status === "held") {
            return res.status(400).json({
                message: "Cannot update the price of a sold or held seat"
            });
        }


        const event=await Event.findById(seat.event);

        if(!event){
            return res.status(404).json({message:"Bad request"});
        }

        if(event.organizer.toString()!==userid){
            return res.status(403).json({message:"No Authorization"});
        }


        const delete_seat=await Seat.findByIdAndDelete(id);

        return res.status(200).json({message:"Seat Deleted Successfully"});
        
        
        
        }
    catch(err){
        console.log(err);

        return res.status(500).json({message:"Internal Server Error"});
    }
}

module.exports=delete_seat;