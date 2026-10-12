const user=require("../models/user");
const jwt=require("jsonwebtoken");
async function logout(req,res){
    try{
        const authheader=req.headers.authorization||req.headers.Authorization;
        let token;
        if(authheader&&authheader.startsWith("Bearer ")){
            token=authheader.split(" ")[1];
        }
        if(!token){
            return res.status(401).json({message:"invlaid token"});
        }

        const decode=jwt.verify(token,process.env.REFRESH_TOKEN);
        if(decode.tokenType!=="refresh"){
            return res.status(401).json({message:"Not valid token"});
        }

        const data=await user.findById(decode.id);

        if(!data){
            return res.status(401).json({message:"No Data Found"});
        }
        data.refreshToken=null;
        await data.save();
        return res.status(200).json({message: "Logout successful"});
    }
    catch(err){
        console.error(err);
        if(err.name === "JsonWebTokenError" ||err.name === "TokenExpiredError"){
            return res.status(401).json({message: "Invalid or expired token"});
        }

        
        return res.status(500).json({message: "Internal server error"});
    }

}
module.exports=logout;