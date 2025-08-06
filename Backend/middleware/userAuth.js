import HandleError from "../utils/handleError.js";
import handleAsyncError from "./handleAsyncError.js";
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

// middleware/auth.js
export const verifyUserAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const roleBasedAccess=(...roles) =>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new HandleError(`Role - ${req.user.role} is not allowed to access the resource`,403))
        }
        next()
    }
}