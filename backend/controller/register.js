const user=require("../models/user");
async function register(req,res){
    try{
        const {username,password,email,role}=req.body;

        if(!username||!email||!password){
            return res.status(400).json({message:"Username, email and password require!!"});
        }
        
        if(password.length<8){
            return res.status(400).json({message:"Password Must be greater than 8!"});
        }

        const emailexist=await user.findOne({
            email:email.toLowerCase().trim()
        });

        if(emailexist){
            return res.status(400).json({message:"Email alreafy exist,Try with other email"});
        }

        const User=await user.create({
            username:username,
            password:password,
            email:email,
            role:role,
        });

        return res.status(200).json({message:"registration completed",User:{
            id:User._id,
            username:User.username,
            email:User.email,
            role:User.role
        }});
    }
    catch(err){
        if(err.code===11000){
            return res.status(409).json({message:"email already register"});
        }
        
        console.log(err);

        return res.status(401).json({
            message:"error occur"
        });
    }
}

module.exports=register;