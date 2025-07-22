import express from "express";
import { getUserDetail, loginUser, logoutUser, registerUser, resetPassword, updatePassword, updateProfile } from "../controller/userController.js";
import { requestPasswordReset } from "../controller/userController.js";
import { roleBasedAccess, verifyUserAuth } from "../middleware/userAuth.js";
import { getSingleUser, getUserList, updateUser } from "../controller/productController.js";
const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)
router.route('/password/forgot').post(requestPasswordReset)
router.route('/reset/:token').post(resetPassword)
router.route('/profile').post(verifyUserAuth, getUserDetail)
router.route('/password/update').post(verifyUserAuth,updatePassword)
router.route('/profile/update').post(verifyUserAuth,updateProfile)
router.route('/admin/users').get(verifyUserAuth,roleBasedAccess("admin"),getUserList)
router.route('/admin/user/:id').get(verifyUserAuth,roleBasedAccess("admin"),getSingleUser).put(verifyUserAuth,roleBasedAccess("admin"),updateUser)



export default router;      