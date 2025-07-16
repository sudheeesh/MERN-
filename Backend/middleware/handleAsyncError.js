export default (myErrorFun)=> (res,req,next) => {
     Promise.resolve(myErrorFun(res,req,next)).catch(next)
}