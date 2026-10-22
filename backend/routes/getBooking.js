const express=require("express");
const verify = require("../middleware/auth");
const getBooking = require("../controller/get_booking");
const router=express.Router();
router.get("/:id",verify,getBooking);
module.exports=router;