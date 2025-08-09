import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
  getCategoryBySlug,
  updateCategory
} from "../controller/categoryController.js";
import { roleBasedAccess, verifyUserAuth } from "../middleware/userAuth.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// Public routes
router.route("/categories").get(getAllCategories);
router.route("/category/:id").get(getSingleCategory);
router.route("/category/slug/:slug").get(getCategoryBySlug); // New slug-based route

// Admin routes
router
  .route("/admin/category")
  .post(verifyUserAuth,roleBasedAccess("admin"),upload.fields([
    {name: "image", maxCount: 1 },
    {name: "images", maxCount: 5}]), createCategory);

router
  .route("/admin/category/:id")
  .put(verifyUserAuth,roleBasedAccess("admin"),upload.fields([
    {name: "image", maxCount: 1 },
    {name: "images", maxCount: 5}]), updateCategory)
  .delete(verifyUserAuth,roleBasedAccess("admin"), deleteCategory);

export default router;
