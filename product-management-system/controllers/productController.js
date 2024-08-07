const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");


//@desc Create new product
//@route POST /api/products
//@access private
const createProduct = asyncHandler(async (req, res) => {
    const {name, description, price} = req.body;
    console.log(req.body);
    if (!name || !description || !price) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    // const images = req.files.map(file => file.path);
    const images = req.file ? req.file.path : null;

    const product = await Product.create({
        name,
        description,
        price,
        images,
        user_id: req.user.id
    });

    res.status(201).json(product);
});

//@desc Get all products
//@route GET /api/products
//@access private
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ user_id: req.user.id });
    res.status(200).json(products);
});


//@desc Get product
//@route GET /api/product/id
//@access private

const getProduct = asyncHandler(async (req,res)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        res.status(404);
        throw new Error("Product not found");
    }
    res.status(200).json(product);
});

//@desc update product
//@route PUT /api/products/:id
//@access private

const updateProduct =asyncHandler( async (req,res)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        res.status(404);
        throw new Error("Product not found");
    }
    if(product.user_id.toString() !==req.user.id){
        res.status(403);
        throw new Error("User don't have the permission to update the other user.")
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,{
            new: true
        }
    );

    res.status(200).json(updatedProduct);
});

//@desc delete product
//@route DELETE /api/products/:id
//@access private

const deleteProduct = asyncHandler(async (req,res)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        res.status(404);
        throw new Error("Product not found");
    }
    if(product.user_id.toString() !==req.user.id){
        res.status(403);
        throw new Error("User don't have the permission to delete the other user.")
    }


    // await Product.findByIdAndDelete(req.params.id);
    await Product.deleteOne({_id:req.params.id});
    
  
    res.status(200).json(product);
});


module.exports = {getProducts, createProduct, getProduct, updateProduct, deleteProduct};