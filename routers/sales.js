const express = require('express');
const SalesController = require('../controllers/SalesController');
const { validateSale } = require('../middlewares/validateSale');

const router = express.Router();

router.get('/:id', SalesController.getSaleById);
router.get('/', SalesController.getSalesAll);
router.post('/', validateSale, SalesController.createProductSales);
router.put('/:id', validateSale, SalesController.updateSales);

module.exports = router;