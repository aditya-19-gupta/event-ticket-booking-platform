require("dotenv").config()
const express=require("express");
const connectDB = require("./config/db");
const register = require("./routes/register");
const login = require("./routes/login");
const refresh = require("./routes/refresh");
const logout = require("./routes/logout");
const app=express();
const port=8000;




async function startserver(){
    await connectDB();
    
    app.use(express.json());

    app.use("/register",register);
    app.use("/login",login);
    app.use("/refresh",refresh);
    app.use("/logout",logout);

    app.listen(port,()=>{
    console.log("server started");
    })
}

startserver();