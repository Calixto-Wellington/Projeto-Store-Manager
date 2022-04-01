const express = require('express');
const ProductsController = require('../controllers/ProductsController');

const { validateName } = require('../middlewares/checkProduct');
const { validateQuantity } = require('../middlewares/checkProduct');

const router = express.Router();

  router.get('/', ProductsController.getProductAll);
  router.get('/:id', ProductsController.getProductById);
  router.post('/', validateName, validateQuantity, ProductsController.createProduct);
  router.put('/:id', validateName, validateQuantity, ProductsController.updateProduct);
  router.delete('/:id', ProductsController.deleteProduct);

module.exports = router;