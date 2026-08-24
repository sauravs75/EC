const errorHandler =(error,req,res,next)=>{
//console.log(error);
if(error.name === "ValidationError"){
    return res.status(400).json({
        success:false,
        message:error.message
    });
}

if(error.name==="CastError"){
    return res.status(400).json({
        succes:false,
        message:"invalid project id"
    });

}
res.status(500).json({
    success:false,
    message:"internal server error"
});
};
module.exports=errorHandler;