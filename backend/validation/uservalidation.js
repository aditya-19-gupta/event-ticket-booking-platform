const{z}=require("zod");
const registrationSchema=z.object({
    name:z.string().min(1,"Name is required"),
    email:z.string().email("Invalid Email Address"),
    password:z.string().min(8,"Password must have 8 Characters")
});
module.exports={registrationSchema}