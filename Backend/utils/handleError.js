class HandleError extends Error{
    constructor(message,statuscode){
        super(message)
        this.statuscode=statuscode;
        Error.captureStackTrace(this,this.constructor) 
    }

}

export default HandleError;