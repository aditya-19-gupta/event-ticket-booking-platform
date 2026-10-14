const event=require("../models/event");
async function Events(req,res){
    try{
        const {title,description,category,bannerUrl,organizer,venue,address,startDate,endDate,salesStart,salesEnd,status}=req.body;
        const newuser=new event ({title,description,category,bannerUrl,organizer:req.user.id,venue,address,startDate,endDate,salesStart,salesEnd,status});

        await newuser.save();

        return res.status(200).json({message:"Event Created!!"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal server error!!"});
    }
}
module.exports=Events;