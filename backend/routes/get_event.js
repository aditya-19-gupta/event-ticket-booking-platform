const express=require("express");
const get_event = require("../controller/get_event");
const verify=require("../middleware/auth");
const router=express.Router();
router.get("/",verify,get_event);
router.get("/:id",verify,get_event);
module.exports=router;