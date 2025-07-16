import HandleError from "../utils/handleError.js";

export default(err,req,res,next) => {
    err.statuscode=err.statuscode || 500;
    err.message=err.message || "Internal Server Error"

    //cast error
     if(err.name==='CastError'){
        const message =`This is invalid resource ${err.path}`;
        err=new HandleError(message, 404)
     }

    // Duplicate key error 
    if(err.code===11000){
        const message = `This ${Object.keys(err.keyValue)[0]} already registerd. Please Login to continue`;
        err = new HandleError(message,400)
    }
    res.status(err.statuscode).json({
        success:false,
        message:err.message
    })
}