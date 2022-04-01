const ProductsModel = require('../models/ProductsModel');

const getProductAll = async () => {
  try {
    const products = await ProductsModel.getProductAll();
    return products;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
  };
  
const getProductById = async (id) => {
  try {
  const product = await ProductsModel.getProductById(id);
  return product;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const createProduct = async (product) => {
  try {
  const newProduct = await ProductsModel.createProduct(product);
  return newProduct;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const updateProduct = async (product) => {
  try {
    const updateProducts = await ProductsModel.updateProduct(product);
    return updateProducts;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

module.exports = { getProductAll, getProductById, createProduct, updateProduct };