import productModel from "../models/productModel.js"
import slugify from "slugify"
import fs from 'fs'

export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files
        switch (true) {
            case !name:
                return res.status(401).send({
                    error: 'Name is required'
                })
            case !description:
                return res.status(401).send({
                    error: 'Description is required'
                })
            case !price:
                return res.status(401).send({
                    error: 'Price is required'
                })
            case !category:
                return res.status(401).send({
                    error: 'Category is required'
                })
            case !quantity:
                return res.status(401).send({
                    error: 'Quantity is required'
                })
            case photo && photo.size > 1000000:
                return res.status(401).send({
                    error: 'Photo is required and less than 1mb'
                })
        }
        const products = new productModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: 'New Product Created',
            products
        })
    } catch (error) {
        console.log(error)
        res.status(502).send({
            success: false,
            error,
            message: "Error in creating Product"
        })
    }
}

// Update Product 
export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } =
      req.fields;
        const { photo } = req.files
        switch (true) {
            case !name:
                return res.status(401).send({
                    error: 'Name is required'
                })
            case !description:
                return res.status(401).send({
                    error: 'Description is required'
                })
            case !price:
                return res.status(401).send({
                    error: 'Price is required'
                })
            case !category:
                return res.status(401).send({
                    error: 'Category is required'
                })
            case !quantity:
                return res.status(401).send({
                    error: 'Quantity is required'
                })
            case photo && photo.size > 1000000:
                return res.status(401).send({
                    error: 'Photo is required and less than 1mb'
                })
        }
        const products = await productModel.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: 'product updated successfully',
            products
        })
    } catch (error) {
        console.log(error)
        res.status(502).send({
            success: false,
            error,
            message: "Error in updating Product"
        })
    }
}


// // Get all product 
export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            message: 'All Products List',
            countTotal: products.length,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error: error.message,
            message: "Error while getting Product"
        })
    }
}

// // Single product 

export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).populate('category').select("-photo")
        res.status(200).send({
            success: true,
            message: 'Single product fetched successfully',
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting single Product"
        })
    }
}


// Get Photo 
export const getPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo")
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType)
            return res.status(200).send(
                product.photo.data
            )
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting photo"
        })
    }
}

// //  delete product  

export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success: true,
            message: "Categry Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while deleting product",
            error,
        });
    }
};