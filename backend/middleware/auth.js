const jwt=require("jsonwebtoken");
const verify=async (req,res,next)=>{
    try{
        let token;
        const authheader=req.headers.authorization||req.headers.Authorization;
        if(authheader&&authheader.startsWith("Bearer ")){
            token=authheader.split(" ")[1];
        }
        if(!token){
            return res.status(401).json({message:"Invalid token"});
        }
        const decode=jwt.verify(token,process.env.ACCESS_TOKEN);


        req.user=decode;
        next();
    }
    catch(err){
        return res.status(401).json({status:"Token is not valid!! authorization is denied"});
    }
}
module.exports=verify;