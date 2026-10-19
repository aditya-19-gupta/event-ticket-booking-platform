const express=require("express");
const router=express.Router();
const verify = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const updatePrice = require("../controller/updateSeat");

router.patch("/",verify,authorize,updatePrice);
module.exports=router;