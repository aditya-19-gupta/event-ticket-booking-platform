const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const userscheme=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        minlength:8,
    },
    role:{
        type:String,
        enum:["user","organizer","admin"],
        default:"user", 
    },
    isemailverified:{
        type:Boolean,
        default:false,
    },
    accountstatus:{
        type:String,
        enum: ["active", "blocked"],
        default: "active",
    },
    refresToken:{
        type:String,
        default:null,
    },
})


userscheme.pre("save",async function(){
    const user=this;
    if(!user.isModified("password")){
        return;
    }

    const salt=await bcrypt.genSalt(10);
    const hasspassword=await bcrypt.hash(user.password,salt);
    user.password=hasspassword;
})
module.exports=mongoose.model("User",userscheme);