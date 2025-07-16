import handleAsyncError from "../middleware/handleAsyncError.js";
import Product from "../models/productModels.js";
import HandleError from "../utils/handleError.js";
import APIFunctionality from "../utils/apiFunctionality.js"
import User from '../models/userModel.js'

//Get ALL Product
export const getAllProducts = handleAsyncError(async(req,res,next) => {


   const apiFunctionality = new APIFunctionality(Product.find(),req.query).search().filter();
     const products = await apiFunctionality.query
     res.status(200).json({
        success:true,
        products
     })
});

//Create New product
export const createProducts = handleAsyncError(async(req,res,next) => {
   req.body.user= req.user.id
   const product = await Product.create(req.body)
   res.status(201).json({
      success:true,
      product
   })
});

//Update Product

export const updateProduct = handleAsyncError(async(req,res,next) => {
     const product = await Product.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      runValidators:true
     })
     if(!product){
      return next(new HandleError("Product Not Found", 404))
      }
     res.status(200).json({
      success:true,
      product
     })
   })



export const deleteProduct = handleAsyncError(async(req,res,next) => {
     const product = await Product.findByIdAndDelete(req.params.id)
     if(!product){
      return next(new HandleError("Product Not Found", 404))
      }
     res.status(200).json({
      success:true,
      message:"Product delete Successfully"
     })
   })


//getSingleProduct

export const getSingleProducts = handleAsyncError(async(req,res,next) => {
    const product = await Product.findById(req.params.id)
     if(!product){
      return next(new HandleError("Product Not Found", 404))
      }
      res.status(200).json({
      success:true,
      product
     })
})

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

   }catch(error){
       user.resetPasswordToken=undefined
       user.resetPasswordExpire=undefined
       await user.save({validateBeforeSave:false})
       return next(new HandleError("could not save reset token,please try again later",500))
   }

   
})


   

