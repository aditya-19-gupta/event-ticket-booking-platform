const user=require("../models/user");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");

async function login(req,res){
    try{
        const {email,password}=req.body||{};

        if(!email||!password){
            return res.status(400).json({message:"Email and Password require!!"});
        }

        
        const data=await user.findOne({
            email:email.toLowerCase().trim()
        })

        if(!data){
            return res.status(401).json({message:"No Data found"});
        }

        if(data.accountstatus!=="active"){
            return res.status(403).json({message:"account is blocked"});
        }

        const passwordcheck=await bcrypt.compare(password,data.password);

        if(!passwordcheck){
            return res.status(401).json({message:"Wrong Password"});
        }

        const accessToken=jwt.sign({id:data._id.toString(),role:data.role},process.env.ACCESS_TOKEN,{expiresIn:"1h"});

  

        const refreshToken=jwt.sign({id:data._id.toString(),tokenType:"refresh"},process.env.REFRESH_TOKEN,{expiresIn:"7d"});
    

        data.refreshToken=refreshToken;
        await data.save();

        return res.status(200).json({
            message: "Login successful",
            accessToken,
            refreshToken,
            user: {
                id: data._id,
                username: data.username,
                email: data.email,
                role: data.role
            }
        });

    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Error occured!!"});
    }

}
module.exports=login;