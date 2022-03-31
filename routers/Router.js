const express = require('express');

const ProductsController = require('../controllers/ProductsController');

const SalesController = require('../controllers/SalesController');

const router = express.Router();

router
  .get('/products', ProductsController.getProductAll)
  .get('/products/:id', ProductsController.getProductById)
  .get('/sales', SalesController.getSalesAll)
  .get('/sales/:id', SalesController.getSaleById);

module.exports = router;