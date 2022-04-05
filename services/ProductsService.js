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

const getByNames = async ({ name }) => {
    const getByName = await ProductsModel.getByName(name);
    return getByName;
  };

  const createProduct = async (product) => {
    const newProduct = await ProductsModel.createProduct(product);
  return newProduct;
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

const deleteProduct = async (id) => {
  try {
    const deleteProducts = await ProductsModel.deleteProduct(id);
    return deleteProducts;
  } catch (err) {
    console.error(err);
    return process.exit(1);
}
};

module.exports = { 
  getProductAll, getProductById, getByNames, updateProduct, deleteProduct, createProduct };