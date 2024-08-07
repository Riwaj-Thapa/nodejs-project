const express = require('express');
const router = express.Router();
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { productImageUpload } = require('../config/multerConfig');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);

// Route to create a new product
// Requires authentication and allows multiple images
router.post('/', productImageUpload.array('productImages', 10), createProduct);

// Route to get all products for the current user
// Requires authentication
router.get('/', getProducts);

// Route to get a single product by ID
// Requires authentication
router.get('/:id', getProduct);

// Route to update a product by ID
// Requires authentication and allows multiple images
router.put('/:id', productImageUpload.array('productImages', 10), updateProduct);

// Route to delete a product by ID
// Requires authentication
router.delete('/:id',deleteProduct);

module.exports = router;
