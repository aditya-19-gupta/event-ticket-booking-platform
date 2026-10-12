const express=require("express");
const refresh = require("../controller/refresh");
const router=express.Router();

router.post("/",refresh);

module.exports=router;