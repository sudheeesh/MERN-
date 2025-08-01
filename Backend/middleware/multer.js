import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:'ecommerce-products',
        allowed_formats:['jpg','png','jpeg','webp']
        
    },
});

const upload =multer({storage})

export default upload