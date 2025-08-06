import mongoose from "mongoose";
import validator from 'validator'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import crypto from 'crypto'
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxLength:[25,"Invalid name. Please enter a name with fewer than 25 characters"],
        minLength:[3, "Name should contain more than 3 characters "]
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"please enter password"],
        minLength:[8,"Password should be more than 8 characters"],
        select:false
    },
    avatar:{
        
         public_id:{
            type:String,
            required:true
         },
         url:{
             type:String,
             required:true
            }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date

},{timestamps:true})
 //password hashing
userSchema.pre('save', async function(next){
       //1st- updating profile(name,email,image)--hashed password will be hashed again
      //2nd- update password ✅   
    if(!this.isModified('password')){
        return next()
    }
    this.password=await bcrypt.hash(this.password,10)
})

userSchema.methods.verifyPassword=async function(userEnteredPassword){
      return await bcrypt.compare(userEnteredPassword,this.password)
}
userSchema.methods.getJWTToken = function () {
  const token = jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRE }
  );

  console.log("Generated JWT Token:", token); // ✅ Now token is defined

  return token;
};


userSchema.methods.generatePasswordResetToken=function(){
  const resetToken = crypto.randomBytes(20).toString('hex')
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
  this.resetPasswordExpire=Date.now()+ 10*60*1000 // 10minutes
  return resetToken 
}


export default mongoose.model("User",userSchema)