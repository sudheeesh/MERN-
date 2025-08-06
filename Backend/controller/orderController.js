import Order from '../models/orderModel.js';
import Product from '../models/productModels.js';
import User from '../models/userModel.js'
import HandleError from '../utils/handleError.js';
import  handleAsyncError from "../middleware/handleAsyncError.js"


// create order
export const createNewOrder = handleAsyncError(async (req, res, next) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });

   
    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    console.error("❌ Error creating order:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
});

//single order
export const getSingleOrder = handleAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate("user", "name email")
    if(!order){
        return next(new HandleError("Order not found",404))
    }
    res.status(200).json({
        success:true,
        order
    })
})

//all order
export const allMyOrder = handleAsyncError(async(req,res,next)=>{
     const orders = await Order.find({user:req.user._id}).populate("user", "name email")
     if(!orders){
        return next(new HandleError("No product found",400))
     }
     res.status(200).json({
        success:true,
        orders
     })
})

//admin getall order
export const adminGetAllOrder = handleAsyncError(async(req,res,next)=>{
     const orders = await Order.find()
     let totalAmount = 0
     orders.forEach(order => {
        totalAmount+=order.totalPrice
     })
     res.status(200).json({
        success:true,
        orders,
        totalAmount
     })
})

//update order
export const adminUpdateOrder = handleAsyncError(async(req,res,next)=> {
    const order = await Order.findById(req.params.id)
    if(!order){
        return next(new HandleError('Order not found',404))
    }
    if(order.orderStatus === "Delivered"){
        return next(new HandleError('Order has not found its delivered already',404))
    }

    await Promise.all(order.orderItems.map(items => updateQuantity(items.product,items.quantity)
))
   order.orderStatus=req.body.status

   if(order.orderStatus==="Delivered"){
     order.deliveredAt=Date.now()
   }
   await order.save({ validateBeforeSave: false });
   res.status(200).json({
      success:true,
      order
   })
   async function updateQuantity(id,quantity) {
       const product = await Product.findById(id)
        if(!product){
        return next(new HandleError('product not found',404))
        }
       product.stock-=quantity
       await product.save({validateBeforeSave:false})
       
   }
})

//delete delivered
export const deleteDelivered = handleAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)
      if(!order){
        return next(new HandleError('Order not found',404))
    }
    if(order.orderStatus!== "Delivered"){
        return next(new HandleError('Order is not delivered its in process',404))
    }
    await  order.deleteOne({_id:req.params.id})
    res.status(200).json({
        success:true,
        message:"Order delete Successfully after delivered"
    })

})
