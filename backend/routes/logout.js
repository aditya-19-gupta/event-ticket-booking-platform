const express=require("express");
const logout = require("../controller/logout");
const router =express.Router();

router.post("/",logout);

module.exports=router;