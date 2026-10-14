const user=require("../models/user");
const jwt=require("jsonwebtoken");
async function refresh(req,res){
    try{
        const authheader=req.headers.Authorization||req.headers.authorization;
        let token;
        if(authheader && authheader.startsWith("Bearer ")){
            token=authheader.split(" ")[1];
        }
        
        if(!token){
            return res.status(401).json({message:"invalid token"});
        }




        let decode=jwt.verify(token,process.env.REFRESH_TOKEN);


        if(decode.tokenType !== "refresh"){
            return res.status(401).json({message:"Invalid token"});
        }
        
        const data=await user.findById(decode.id);

        if(!data){
            return res.status(401).json({message:"invalid data"});
        }
        if(data.refreshToken!==token){
            return res.status(401).json({message:"Invalid token"});
        }
        

        const newtoken=jwt.sign({id:data._id.toString(),role:data.role},process.env.ACCESS_TOKEN,{expiresIn:"1h"});


        const newrefresh=jwt.sign({id:data._id.toString(),tokenType:"refresh"},process.env.REFRESH_TOKEN,{expiresIn:"7d"});

        data.refreshToken=newrefresh;

        await data.save();

        return res.status(200).json({
            message: "Token refreshed successfully",
            accessToken: newtoken,
            refreshToken: newrefresh
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal server error"});;
    }
}

module.exports=refresh;