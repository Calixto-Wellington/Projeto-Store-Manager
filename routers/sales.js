const express = require('express');
const SalesController = require('../controllers/SalesController');

const router = express.Router();

router.get('/', SalesController.getSalesAll);
router.get('/:id', SalesController.getSaleById);
router.post('/', SalesController.createProductSales);

module.exports = router;