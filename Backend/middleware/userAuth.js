import HandleError from "../utils/handleError.js";
import handleAsyncError from "./handleAsyncError.js";
import jwt from 'jsonwebtoken'
import User from "../models/userModel.js"


export const verifyUserAuth = handleAsyncError(async (req, res, next) => {
  let token;

  // ✅ Try to get token from Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log("✅ Extracted Token from Header:", token);
  }

  // ✅ Else, try to get token from cookies
  if (!token && req.cookies.token) {
    token = req.cookies.token;
    console.log("✅ Extracted Token from Cookie:", token);
  }

  if (!token) {
    return next(new HandleError("Please login to access this resource", 401));
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("✅ Decoded JWT:", decodedData);
    req.user = await User.findById(decodedData.id);
    next();
  } catch (error) {
    return next(new HandleError("Invalid token", 401));
  }
});


export const roleBasedAccess=(...roles) =>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new HandleError(`Role - ${req.user.role} is not allowed to access the resource`,403))
        }
        next()
    }
}