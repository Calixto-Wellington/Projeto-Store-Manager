const SalesModel = require('../models/SalesModel');

const getSalesAll = async () => {
  const sales = await SalesModel.getSalesAll();

  return sales;
};

const getSaleById = async (id) => {
  const sale = await SalesModel.getSaleById(id);

  return sale;
};

module.exports = { getSalesAll, getSaleById };