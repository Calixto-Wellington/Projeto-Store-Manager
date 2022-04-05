const express = require('express');
const SalesController = require('../controllers/SalesController');
const { validateProductId } = require('../middlewares/validateProductId');
const { validateQuantity } = require('../middlewares/validateQuantity');

const router = express.Router();

router.get('/:id', SalesController.getSaleById);
router.get('/', SalesController.getSalesAll);
router.post('/', validateProductId, validateQuantity, SalesController.createProductSales);
router.put('/:id', validateProductId, validateQuantity, SalesController.updateSales);

module.exports = router;