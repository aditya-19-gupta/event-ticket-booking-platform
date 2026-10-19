const seat=require("../models/seat");
const mongoose=require("mongoose");

async function getSeat(req,res){
    try {
        const id=req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message: "Invalid Event ID"});
        }

        const data = await seat.find({ event: id ,status:"available"});

        return res.status(200).json({
            count:data.length,
            Data:data,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server error"});
    }
}
module.exports=getSeat;