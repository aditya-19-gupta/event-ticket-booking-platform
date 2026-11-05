const express=require("express");
const register = require("../controller/register");
const validate = require("../middleware/validate");
const { registrationSchema } = require("../validation/uservalidation");
const router=express.Router();

router.post("/",validate(registrationSchema),register);
module.exports=router;