import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
    createProductController,
    deleteProductController,
    getPhotoController,
    getProductController,
    getSingleProductController,
    updateProductController
} from "../controllers/productController.js";
import formidable from "express-formidable";


const router = express.Router()

// routes 
// Create product 
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

// update product 
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController)

// Get all product 
router.get('/get-products', getProductController)

// // Get Single Product  
router.get('/get-product/:slug', getSingleProductController)

// Get Photo 
router.get('/product-photo/:pid', getPhotoController)

// // Delete Product 

router.delete('/delete-product/:pid', requireSignIn, isAdmin, deleteProductController)

export default router