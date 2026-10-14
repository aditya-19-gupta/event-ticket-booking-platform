const event = require("../models/event");
const mongoose = require("mongoose");

async function Delete(req, res){
    try {
        const id = req.params.id;
        const userId = req.user.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid Event ID"
            });
        }

        const data = await event.findById(id);

        if (!data) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        if (data.organizer.toString() !== userId) {
            return res.status(403).json({
                message: "You do not own this event"
            });
        }

        const User_delete=await event.findOneAndDelete({
            _id:id,
            organizer:userId,
        })
        if(!User_delete){
            return res.status(404).json({message:"event Not deleted"});
        }

        return res.status(200).json({message:"event Deleted"});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}
module.exports=Delete;