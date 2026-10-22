const mongoose=require("mongoose");
const Seat=require("../models/seat");

async function hold(req,res){
    try {
        const seatid=req.params.id;
        const userid=req.user.id;

        if (!mongoose.Types.ObjectId.isValid(seatid)) {
            return res.status(400).json({
                message: "Invalid Seat ID"
            });
        }

        const now=new Date();
        const expiresAt = new Date(now.getTime() + 10 * 60 * 1000);

        const seat=await Seat.findOneAndUpdate({
            _id:seatid,
            $or:[
                {status:"available"},
                {
                    status:"held",
                    holdExpiresAt:{$lte:now}

                }
            ]
            },
            {
                $set:{
                    status:"held",
                    heldBy:userid,
                    holdExpiresAt:expiresAt
                }
            },
            {
                new:true,
                runValidators:true
            }
        )

        if(!seat){
            return res.status(409).json({message:"Seat is not available at the movement"});
        }

        return res.status(200).json({message:"Seat is Booked Successfully",Data:seat});


    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server error"});
    }
}

module.exports=hold;