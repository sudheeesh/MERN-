import Product from "../models/productModels.js";

//Create New Product
export const getAllProducts = async(req,res) => {
   const products = await Product.find()
     res.status(200).json({
        success:true,
        products
     })
};

//Get ALL product
export const createProducts = async(req,res) => {
   const product = await Product.create(req.body)
   res.status(201).json({
      success:true,
      product
   })
};

//Update Product