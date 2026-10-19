const express=require("express");
const authorize = require("../middleware/auth");
const getSeat = require("../controller/get_seat");
const router=express.Router();

router.get("/:id",authorize,getSeat);
module.exports=router;