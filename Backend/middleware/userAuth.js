import HandleError from "../utils/handleError.js";
import handleAsyncError from "./handleAsyncError.js";
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

// middleware/auth.js
export const verifyUserAuth =handleAsyncError(async (req, res, next) => {
  let token;
   console.log("Authorization Header:", req.headers.authorization);
  // ✅ From Authorization Header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
     console.log("✅ Extracted Token:", token);
  }

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  try {
    console.log("JWT_SECRET:", process.env.JWT_SECRET_KEY);
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log("✅ Decoded JWT:", decodedData);
    req.user = await User.findById(decodedData.id);
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid token", 401));
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