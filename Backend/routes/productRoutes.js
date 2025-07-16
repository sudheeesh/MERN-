import express from "express";
const router = express.Router()
import { createProducts, getAllProducts, updateProduct, deleteProduct, getSingleProducts} from "../controller/productController.js";
import { roleBasedAccess, verifyUserAuth } from "../middleware/userAuth.js";

router.route("/products").get(verifyUserAuth,getAllProducts).post(verifyUserAuth,roleBasedAccess('admin'), createProducts)
router.route("/product/:id").put(verifyUserAuth,roleBasedAccess('admin'),updateProduct).delete(verifyUserAuth,roleBasedAccess('admin'),deleteProduct).get(verifyUserAuth,getSingleProducts)

export default router;