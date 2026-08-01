const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controller/productController');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })


const router = express.Router();

/**
This line is Express.js Router chaining. It is used to define multiple HTTP methods for the same route.

admin and protect are middleware
router.route('/')
      .get(getProducts)
      .post(protect, admin, createProduct);

Let's break it down:

1. router.route('/')

It creates a route for / path.

Equivalent to:

router.get('/')
router.post('/')

but route() allows you to chain methods.
 */

// all product
router.route('/').get(getProducts).post(protect, admin, upload.single('image'),createProduct)
// single product
router.route('/:id').get(getProductById).put(protect, admin, upload.single('image'), updateProduct).delete(protect, admin, deleteProduct)

module.exports = router