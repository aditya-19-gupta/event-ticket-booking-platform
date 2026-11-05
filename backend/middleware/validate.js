function validate(Schema){
    return(req,res,next)=>{
        const result=Schema.safeParse(req.body);
        if(!result.success){
            return res.status(400).json({
                message:"Invalid Data Validation failed",
                errors:result.error.issues
            });

        }
        req.body=result.data;
        next();
    }
}
module.exports=validate; 