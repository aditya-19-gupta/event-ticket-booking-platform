const express=require("express");
const verify = require("../middleware/auth");
const cancel_seat = require("../controller/cancel_seat");
const router=express.Router();

router.patch("/",verify,cancel_seat);

module.exports=router;