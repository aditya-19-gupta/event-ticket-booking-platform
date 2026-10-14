const event=require("../models/event");
const mongoose=require("mongoose");
async function get_event(req,res){
    try{

        try{
            const id=req.params.id;

            if(id){
                if (!mongoose.Types.ObjectId.isValid(id)) {
                    return res.status(400).json({message: "Invalid Event ID"});
                    
                }

                const eventdata=await event.findOne({
                    _id:id,
                    status:"published"
                });

                if(!eventdata){
                    return res.status(404).json({message:"Event Not Found"});
                }

                return res.status(200).json({eventdata});
            }
        }
        catch(err){
            console.log(err);
            return res.status(500).json({message:"Internal server error"})
        }


        const data=await event.find({
        status:"published"
        });
        if(data.length===0){
            return res.status(401).json({message:"No Event is Present"});
            data:[]
        }
        return res.status(200).json({data});
    }
    catch(err){
        return res.status(500).json({message:"Internal server error"});
    }
}
module.exports=get_event;