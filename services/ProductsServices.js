const ProductsModel = require('../models/ProductsModel');

const getAll = async () => {
  const products = await ProductsModel.getAll();

  return products;
};

const getById = async (id) => {
  const product = await ProductsModel.getById(id);

  return product;
};

module.exports = { getAll, getById };