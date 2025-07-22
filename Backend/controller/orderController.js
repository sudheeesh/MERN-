import Order from '../models/orderModel.js';
import Product from '../models/productModels.js';
import User from '../models/userModel.js'
import HandleError from '../utils/handleError.js';
import  handleAsyncError from "../middleware/handleAsyncError.js"


export const createNewOrder = handleAsyncError(async(req,res,next)=>{
    const {shippingInfo,orderItems,
           paymentInfo,itemPrice,
           taxPrice,shippingPrice,totalPrice} = req.body

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    })
    res.status(200).json({
        success:true,
        order
    })
})