// const seat=require("../models/seat");
// const event=require("../models/event");

// async function updatePrice(req,res){
//     try{
//         const userId=req.user.id;
//         const id=req.params.id;
//         const{price}=req.body;
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//                 return res.status(400).json({message: "Invalid Event ID"});
//         }

//         const data=await event.findOne({
//             organizer:userId
//         })
//         if(!data){
//             return res.status(403).json({message:"NO authorization"});
//         }

//         if(!price){
//             return res.status(400).json({message: "Required event fields are missing"});
//         }
//         const Seat=await seat.findByIdAndUpdate(
//             id,
//             {
//                 price
//             },
//             { new: true, runValidators: true }
//         );

//         return res.status(200).json({message:"price updated successfully!!",price:Seat});
        
//     }
//     catch(err){
//         console.error(err);
//         return res.status(500).json({message: "Internal server error"});
//     }
// }

// module.exports=updatePrice;



const Seat = require("../models/seat");
const Event = require("../models/event");
const mongoose = require("mongoose");

async function updatePrice(req, res) {
    try {
        const userId = req.user.id;
        const id = req.params.id;
        const { price } = req.body;

        // 1. Validate Seat ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid Seat ID"
            });
        }

        // 2. Validate price
        if (
            price === undefined ||
            price === null ||
            typeof price !== "number" ||
            !Number.isFinite(price) ||
            price < 0
        ) {
            return res.status(400).json({
                message: "Price must be a valid non-negative number"
            });
        }

        // 3. Find the seat
        const seat = await Seat.findById(id);

        if (!seat) {
            return res.status(404).json({
                message: "Seat not found"
            });
        }

        // 4. Check seat status
        if (seat.status === "sold" || seat.status === "held") {
            return res.status(400).json({
                message: "Cannot update the price of a sold or held seat"
            });
        }

        // 5. Find the event associated with this seat
        const event = await Event.findById(seat.event);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        // 6. Verify organizer ownership
        if (event.organizer.toString() !== userId) {
            return res.status(403).json({
                message: "You do not own this event"
            });
        }

        // 7. Update the price
        seat.price = price;
        await seat.save();

        return res.status(200).json({
            message: "Price updated successfully",
            data: seat
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports = updatePrice;
