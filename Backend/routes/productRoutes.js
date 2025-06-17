import express from "express";
const router = express.Router()
import { createProducts, getAllProducts } from "../controller/productcontroller.js";

router.route("/products").get(getAllProducts).post(createProducts)

export default router;