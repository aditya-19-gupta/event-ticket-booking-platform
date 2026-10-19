const express=require("express");
const verify = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const create_event=require("../controller/create_event");
const router=express.Router();


router.post("/",verify,authorize("organizer"), create_event);

module.exports=router;