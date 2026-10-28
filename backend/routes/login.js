const express=require("express");
const login = require("../controller/login");
const loginLimiter = require("../middleware/ratelimit");
const router=express.Router();

router.post("/",loginLimiter,login);

module.exports=router;