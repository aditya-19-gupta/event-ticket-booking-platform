const express=require("express");
const router=express.Router();
const verify = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const update = require("../controller/update_event");

router.put("/:id", verify, authorize("organizer"), update);

module.exports=router;
