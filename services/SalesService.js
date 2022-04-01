const SalesModel = require('../models/SalesModel');

const getSalesAll = async () => {
  const sales = await SalesModel.getSalesAll();

  return sales;
};

const getSaleById = async (id) => {
  const sale = await SalesModel.getSaleById(id);

  return sale;
};

const createProductSales = async (sale) => {
  const newSale = await SalesModel.createSalesProduct(sale);
  return newSale;
};

module.exports = { getSalesAll, getSaleById, createProductSales };