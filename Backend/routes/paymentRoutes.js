import express from "express"
import { processPayment, sendAPIKEY } from '../controller/paymentController.js'

const router = express.Router()

router.route('/payment').post(processPayment)
router.route('/getKey').get(sendAPIKEY)

export default router