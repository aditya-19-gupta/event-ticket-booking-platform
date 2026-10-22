const express=require("express");
const router=express.Router();
const verify=require("../middleware/auth");
const checkout = require("../controller/checkout");
router.post("/",verify,checkout);
module.exports=router;