const ProductsModel = require('../models/ProductsModel');

const getProductAll = async () => {
  const products = await ProductsModel.getProductAll();

  return products;
};

const getProductById = async (id) => {
  const product = await ProductsModel.getProductById(id);

  return product;
};

module.exports = { getProductAll, getProductById };