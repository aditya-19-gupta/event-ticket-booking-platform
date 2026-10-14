const express=require("express");
const verify = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const Delete = require("../controller/delete_event");

const router=express.Router();

router.delete("/:id",verify,authorize("organizer"),Delete);
module.exports=router;