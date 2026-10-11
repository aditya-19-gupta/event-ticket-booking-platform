require("dotenv").config()
const express=require("express");
const connectDB = require("./config/db");
const register = require("./routes/register");
const app=express();
const port=8000;




async function startserver(){
    await connectDB();
    
    app.use(express.json());

    app.use("/register",register);


    app.listen(port,()=>{
    console.log("server started");
    })
}

startserver();