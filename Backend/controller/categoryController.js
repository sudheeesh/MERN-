import handleAsyncError from "../middleware/handleAsyncError.js";
import Category from "../models/categoryModel.js";
import HandleError from "../utils/handleError.js";
import cloudinary from "cloudinary";

//create category
export const createCategory = handleAsyncError(async (req, res, next) => {
  const { name, description } = req.body;

  if (!name) {
    return next(new HandleError("Category name is required", 400));
  }

  let imageData = {};
  let galleryData = [];

  // Single main image
  if (req.files && req.files.image && req.files.image[0]) {
    const result = await cloudinary.v2.uploader.upload(req.files.image[0].path, {
      folder: "categories",
    });
    imageData = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  // Multiple gallery images
  if (req.files && req.files.images && req.files.images.length > 0) {
    for (const file of req.files.images) {
      const result = await cloudinary.v2.uploader.upload(file.path, {
        folder: "categories/gallery",
      });
      galleryData.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  }

  const category = await Category.create({
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    description,
    image: imageData,     // single image
    images: galleryData,  // array of images
  });

  res.status(201).json({
    success: true,
    category,
  });
});

// All categories
export const getAllCategories = handleAsyncError(async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json({
    success: true,
    categories,
  });
});

// Update category
export const updateCategory = handleAsyncError(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new HandleError("Category Not Found", 404));
  }

  if (req.body.name) {
    category.name = req.body.name.trim();
    category.slug = category.name.toLowerCase().replace(/\s+/g, "-");
  }

  if (req.body.description) {
    category.description = req.body.description;
  }

  await category.save();

  res.status(200).json({
    success: true,
    category,
  });
});

// Single category by ID
export const getSingleCategory = handleAsyncError(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new HandleError("Category Not Found", 404));
  }

  res.status(200).json({
    success: true,
    category,
  });
});

// Single category by slug
export const getCategoryBySlug = handleAsyncError(async (req, res, next) => {
  const category = await Category.findOne({ slug: req.params.slug });

  if (!category) {
    return next(new HandleError("Category Not Found", 404));
  }

  res.status(200).json({
    success: true,
    category,
  });
});

// Delete category
export const deleteCategory = handleAsyncError(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    return next(new HandleError("Category Not Found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
});
