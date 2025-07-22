import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {
        type:String,
        required:[true,"Please Enter product Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please Enter Product Description"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter Product Price"],
        MaxLenght:[7,"Price Cannot Exceed 7 digits"]
    },
    ratings:{
        type:Number,
        default:0
    },
    image:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please Enter product Category"]
    },
    stock:{
        type:Number,
        required:[true,"Please Enter Product Stock"],
        MaxLenght:[5,"Price Cannot Exceed 5 digits"],
        default:1
    },
    numofReviews:{
        type:String,
        default:0
    },
    reviews:[
        { user:{
             type:mongoose.Schema.ObjectId,
             ref:"User",
             required:true
        },
        // name:{
        //     type:String,
        //     required:true
        // },
        rating:{
            type:String,
            required:true
        },
        comment:{
            type:String,
            required:true
        }
        },
    
    ],
        user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model("Product", productSchema)