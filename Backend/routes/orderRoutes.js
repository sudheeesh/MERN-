import express from "express"
import { createNewOrder } from "../controller/orderController.js";
import { verifyUserAuth } from "../middleware/userAuth.js";
const router = express.Router()

router.route('/new/order').post(verifyUserAuth,createNewOrder)

export default router