const express = require('express');

const ProductsController = require('../controllers/ProductsControllers');

const router = express.Router();

router
  .get('/products', ProductsController.getAll)
  .get('/products/:id', ProductsController.getById);

module.exports = router;