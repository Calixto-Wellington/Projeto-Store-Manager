const express = require('express');
const ProductsController = require('../controllers/ProductsController');

const { validateName } = require('../middlewares/checkProduct');
const { validateQuantityProduct } = require('../middlewares/checkProduct');

const router = express.Router();

  router.get('/:id', ProductsController.getProductById);
  router.get('/', ProductsController.getProductAll);
  router.post('/', validateName, validateQuantityProduct, ProductsController.createProduct);
  router.put('/:id', validateName, validateQuantityProduct, ProductsController.updateProduct);
  router.delete('/:id', ProductsController.deleteProduct);

module.exports = router;