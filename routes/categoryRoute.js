import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { CreateCategoryController, categoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "../controllers/categoryController.js";
import categoryModel from "../models/categoryModel.js";

const router = express.Router()

// routes 
// Create category 
router.post('/create-category', requireSignIn, isAdmin, CreateCategoryController)

// update category 
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)

// Get all category 

router.get('/get-categories', categoryController)

// Get Single Category 

router.get('/get-category/:slug', singleCategoryController)

// Delete Category 

router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)

export default router