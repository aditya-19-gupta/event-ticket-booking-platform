const express=require("express");
const router=express.Router();
const authorize = require("../middleware/authorize");
const verify=require("../middleware/auth");
const delete_seat = require("../controller/delete_seat");
router.delete("/:id",verify,authorize("organizer"),delete_seat);

module.exports=router;