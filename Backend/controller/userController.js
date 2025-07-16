import handleAsyncError from "../middleware/handleAsyncError.js";
import User from "../models/userModel.js"
import HandleError from "../utils/handleError.js";
import { sendToken } from "../utils/jwtToken.js";

export const registerUser = handleAsyncError(async(req,res,next)=> {
      const {name,email,password} = req.body;
      const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"this is temp id",
            url:"this is temp url"
        }
      })
    sendToken(user,201,res)
})

export const loginUser = handleAsyncError(async(req,res,next)=>{
  const {email,password} = req.body;
  if(!email || !password){
    return next(new HandleError("Email and password cannot be empty",400))
  }
  const user =await User.findOne({email}).select("+password")
  if(!user){
    return next(new HandleError("Invalid email or password",400))
  }
  const isValidPassword = await user.verifyPassword(password)
  if(!isValidPassword){
     return next(new HandleError("Invalid email or password",400))
  }
  sendToken(user,200,res)
})

export const logoutUser = handleAsyncError(async(req,res,nwxt) => {
  res.cookie('token',null,{
    expires:new Date(Date.now()),
    httpOnly:true
  }) 
  res.status(200).json({
        success : true,
        message : "Successfully Logged out"
  })
})
