const express=require("express");
const verify = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const create_event=require("../controller/create_event");
const router=express.Router();

console.log("verify:", typeof verify);
console.log("authorize:", typeof authorize);
console.log("create_event:", typeof create_event);

router.post("/",verify,authorize("organizer"), create_event);

module.exports=router;