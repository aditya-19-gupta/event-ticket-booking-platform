const express=require("express");
const router=express.Router();
const verify = require("../middleware/auth");
const hold = require("../controller/hold_seat");

router.post("/:id",verify,hold);
module.exports=router;