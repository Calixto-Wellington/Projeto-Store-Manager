const express = require('express');
const SalesController = require('../controllers/SalesController');
const { validateProductId } = require('../middlewares/validateSale');
const { validateQuantity } = require('../middlewares/validateSale');

const router = express.Router();

router.get('/:id', SalesController.getSaleById);
router.get('/', SalesController.getSalesAll);
router.post('/', validateProductId, validateQuantity, SalesController.createProductSales);
router.put('/:id', validateProductId, validateQuantity, SalesController.updateSales);

module.exports = router;