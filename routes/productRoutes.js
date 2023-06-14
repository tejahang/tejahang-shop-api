const express = require('express');
const productController = require('./../controllers/productContoller');
const { requireAuth } = require('./../auth/authMiddleware');

const router = express.Router();

// DEFAUL
router
  .route('/add-product')
  .post(
    productController.upload.single('image'),
    productController.createProduct
  );

router.route('/').get(productController.getProducts); // get list of products

router.route('/categories').get(productController.getCategories); // get list of categories

router.route('/cart').post(requireAuth, productController.createCart); // create a cart and checkout

router.route('/search').post(productController.searchProducts); // create a cart and checkout

module.exports = router; // imported into app.js
