const event=require("../models/event");
const mongoose=require("mongoose");
const {redis}=require("../config/redis");
async function get_event(req,res){
    try{

        try{
            const id=req.params.id;

            if(id){
                if (!mongoose.Types.ObjectId.isValid(id)) {
                    return res.status(400).json({message: "Invalid Event ID"});
                    
                }
                const cachekey=`event:${id}`;
                const cacheddata=await redis.get(cachekey);

                if(cacheddata){
                    return res.status(200).json({eventdata:JSON.parse(cacheddata)});
                }
                const eventdata=await event.findOne({
                    _id:id,
                    status:"draft"
                }).lean();

                if(!eventdata){
                    return res.status(404).json({message:"Event Not Found"});
                }

                await redis.set(cachekey,JSON.stringify(eventdata),{
                    EX:60
                });

                return res.status(200).json({eventdata});
            }
        }
        catch(err){
            console.log(err);
            return res.status(500).json({message:"Internal server error"})
        }

        const cachekey="event:published";
        const cacheddata=await redis.get(cachekey);
        if(cacheddata){
            return res.status(200).json({eventdata:JSON.parse(cacheddata)});
        }
        const data=await event.find({
        status:"draft"
        }).lean();
        if(data.length===0){
            return res.status(401).json({message:"No Event is Present"});
            data:[]
        }
        await redis.set(cachekey,JSON.stringify(data),{
            EX:60
        });
        return res.status(200).json({data});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal server error"});
    }
}
module.exports=get_event;