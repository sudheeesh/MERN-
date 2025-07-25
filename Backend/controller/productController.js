import handleAsyncError from "../middleware/handleAsyncError.js";
import Product from "../models/productModels.js";
import HandleError from "../utils/handleError.js";
import APIFunctionality from "../utils/apiFunctionality.js"
import User from "../models/userModel.js"


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

//admin getting all products

export const getAdminProducts = handleAsyncError(async(req,res,next)=>{
   const products = await Product.find();

   res.status(200).json({
           success:true,
           products
   })
})

//admin accessing user
export const getUserList = handleAsyncError(async(req,res,next)=>{
   const users = await User.find();

    res.status(200).json({
           success:true,
           users
   })

})

//Accessing single User
export const getSingleUser = handleAsyncError(async(req,res,next)=>{
   const user = await User.findById(req.params.id)
   if(!user){
      next(new HandleError(`User doesn't exist for this id ${req.params.id}`,400))
   }
   res.status(200).json({
      message:true,
      user
   })
})

//Updating user
export const updateUser = handleAsyncError(async(req,res,next)=>{
   const {role} = req.body
   const newRoleUpdate = {
      role
   }
   const user = await User.findByIdAndUpdate(req.user.id,newRoleUpdate,{
       new:true,
       runValidators:true
   })
   if(!user){
      next(new HandleError("User doesn't exist",400))
   }
   res.status(200).json({
      success:true,
      user
   })
})

//create and update review
export const createUpdateReview = handleAsyncError(async(req,res,next)=>{
      const{rating,comment,productID} = req.body;
      const review= {
         user : req.user._id,
         rating:Number(rating),
         comment
      }
      const product = await Product.findById(productID);
      const reviewExists = product.reviews.find(review => review.user.toString()=== req.user.id.toString()) //when the id is number we can add .toString()
      if(reviewExists){
          product.reviews.forEach(review => {
          if( review.user.toString()=== req.user.id){
            review.rating = rating;
            review.comment = comment;
          }
      })
   }else{
         product.reviews.push(review)
      }
      product.numofReviews=product.reviews.length
      let sum = 0
      product.reviews.forEach(review => {
         sum+=Number(review.rating)
      })
      product.ratings = product.reviews.length>0? sum/product.reviews.length :0

      await product.save({validateBeforeSave:false})
      res.status(200).json({
         success:true,
         product
      })
})

//Getting reviews
export const getProductReviews = handleAsyncError(async(req,res,next)=>{
     const product =await Product.findById(req.query.id)
     if(!product){
      return next(new HandleError("Product not found",400))
     }
     res.status(200).json({
      success:true,
      reviews:product.reviews
     })
})
// delete review
 export const deleteReviews = handleAsyncError(async(req,res,next)=>{
   const product = await Product.findById(req.query.productID)

   
    if(!product){
      return next(new HandleError("Product not found",400))
     }
     const reviews = product.reviews.filter(review => review._id.toString()!==req.query.id.toString())
     let sum = 0
     reviews.forEach(review => {
        sum+=review.rating
     })
     const rating =reviews.length>0? sum/reviews.length :0
     const numofReviews = reviews.length
     await Product.findByIdAndUpdate(req.query.productID,{
        reviews,
        rating,
        numofReviews,
      },
        {
         new:true,
         runValidators:true
        }),
       res.status(200).json({
            success:true,
            message :"Review deleted permanently",
       })
 })




   

