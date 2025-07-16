import express from "express";
import { loginUser, logoutUser, registerUser } from "../controller/userController.js";
import { requestPasswordReset } from "../controller/productController.js";
const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)
router.route('/password/forgot').post(requestPasswordReset)

export default router;      