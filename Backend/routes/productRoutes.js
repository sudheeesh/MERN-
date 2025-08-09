import express from "express";
const router = express.Router()
import { createProducts, getAllProducts, updateProduct, deleteProduct, getSingleProducts, createUpdateReview, getProductReviews, deleteReviews, getProductsByCategorySlug} from "../controller/productController.js";
import { roleBasedAccess, verifyUserAuth } from "../middleware/userAuth.js";
import upload from "../middleware/multer.js";


router.route("/products").get(getAllProducts)
router.route("/admin/products").get(verifyUserAuth,roleBasedAccess('admin'),getAllProducts)
router.route("/admin/product/create").post(verifyUserAuth,roleBasedAccess('admin'), upload.fields([
    {name: "image", maxCount: 1 },
    {name: "images", maxCount: 5}
]), createProducts)
router.route("/admin/product/:id").put(verifyUserAuth,roleBasedAccess('admin'), upload.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 5 }
  ]),updateProduct).delete(verifyUserAuth,roleBasedAccess('admin'),deleteProduct)
router.route("/product/:id").get(getSingleProducts)
router.route("/review").put(verifyUserAuth,createUpdateReview)
router.route("/reviews").get(getProductReviews).delete(verifyUserAuth,deleteReviews)
router.route("/products/category/:slug").get(getProductsByCategorySlug)
//delete route should be addedd

export default router;