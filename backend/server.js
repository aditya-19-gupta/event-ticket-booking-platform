require("dotenv").config()
const express=require("express");
const connectDB = require("./config/db");
const register = require("./routes/register");
const login = require("./routes/login");
const refresh = require("./routes/refresh");
const logout = require("./routes/logout");
const create_event = require("./routes/create_event");
const get_event = require("./routes/get_event");
const update = require("./routes/update_event");
const Delete = require("./routes/delete_event");
const app=express();
const port=8000;




async function startserver(){
    await connectDB();
    
    app.use(express.json());

    app.use("/register",register);
    app.use("/login",login);
    app.use("/refresh",refresh);
    app.use("/logout",logout);
    app.use("/Create_event",create_event);
    app.use("/getEvent",get_event);
    app.use("/update",update);
    app.use("/delete",Delete);

    app.listen(port,()=>{
    console.log("server started");
    })
}

startserver();