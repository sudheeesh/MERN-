import handleAsyncError from "../middleware/handleAsyncError.js";
import User from "../models/userModel.js"
import HandleError from "../utils/handleError.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from 'crypto'


//registre user
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

//login user
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
//logout user
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

//forgot password reset
export const requestPasswordReset = handleAsyncError(async(req,res,next) => {
   const {email} = req.body;
    const user = await User.findOne({email})
   if(!user){
      return next(new HandleError("User doesn't exist",400))
   }
   let resetToken;
   try{
       resetToken= user.generatePasswordResetToken()
       await user.save({validateBeforeSave:false})
       
   }catch(error){
        return next(new HandleError("Could not save reset token,Please try again later",500))
   }

   const resetPasswodURL = `http://localhost/api/v1/reset${resetToken}`
   const message = `Use the following link to reset your password ${resetPasswodURL}.
   \n\n This link will expire in 10minutes. 
   \n\n If you didn't request a password reset, Please ignore this message`

   try{
      await sendEmail({
        email:user.email,
        subject:'Password Reset Request',
        message : message
      })
        res.status(200).json({
          success:true,
          message:`Email is sent ${user.email} successfully`
        })
   }catch(error){
       user.resetPasswordToken=undefined
       user.resetPasswordExpire=undefined
       await user.save({validateBeforeSave:false})
       return next(new HandleError("could not save reset token,please try again later",500))
   }
   
})

//reset password
export const resetPassword = handleAsyncError(async(req,res,next) => {
     const resetPasswordToken = crypto
     .createHash('sha256')
     .update(req.params.token)
     .digest('hex')

     const user = await User.findOne({
       resetPasswordToken,
       resetPasswordExpire:{$gt:Date.now()} //gt:>
     })
     if(!user){
      return next(new HandleError("Reset password token is ivalid or has been expired",400))
     }
     const {password,confirmPassword} = req.body;
     
     if(password !== confirmPassword){
      return next(new HandleError("Password doesn't match",400))
     }
     user.password=password;
     user.resetPasswordToken=undefined;
     user.resetPasswordExpire=undefined;
     await user.save()
     sendToken(user,200,res)
})

//get user detail
export const getUserDetail = handleAsyncError(async(req,res,next)=>{
     const user = await User.findById(req.user.id)
     res.status(200).json({
      success:true,
      user
     })
})

//update password
export const updatePassword=handleAsyncError(async(req,res,next)=> {
  const {oldPassword,newPassword,confirmPassword} = req.body;
  const user = await User.findById(req.user.id).select("+password")
   
  const checkPasswordMatch = await user.verifyPassword(oldPassword)
  if(!checkPasswordMatch){
    return next(new HandleError("Password is incorrect",400))
  }
  if(newPassword !== confirmPassword){
    return next(new HandleError("Password doesn't match",400))
  }
  user.password=newPassword
  await user.save()
  sendToken(user,200,res)
})

export const updateProfile = handleAsyncError(async(req,res,next)=>{
     const {name,email} = req.body;
     const updateUserDetail = {
      name,
      email
     }
     const user = await User.findByIdAndUpdate(req.user.id, updateUserDetail,{
              new:true,
              runValidators:true
     })
     res.status(200).json({
      success:true,
      message:"Profile Updated Successfully",
      user
     })
})

