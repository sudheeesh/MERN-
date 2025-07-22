import express from "express"
import { adminGetAllOrder, adminUpdateOrder, allMyOrder, createNewOrder, deleteDelivered, getSingleOrder } from "../controller/orderController.js";
import { roleBasedAccess, verifyUserAuth } from "../middleware/userAuth.js";
const router = express.Router()

router.route('/new/order').post(verifyUserAuth,createNewOrder)
router.route('/admin/order/:id').get(verifyUserAuth,roleBasedAccess("admin"),getSingleOrder)
.put(verifyUserAuth,roleBasedAccess("admin"),adminUpdateOrder)
.delete(verifyUserAuth,roleBasedAccess("admin"),deleteDelivered)
router.route('/orders').get(verifyUserAuth,allMyOrder)
router.route('/admin/orders').get(verifyUserAuth,roleBasedAccess("admin"),adminGetAllOrder)

export default router