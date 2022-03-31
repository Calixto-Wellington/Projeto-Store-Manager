const ProductsServices = require('../services/ProductsService');

const getProductAll = async (_req, res) => {
  try {
    const products = await ProductsServices.getProductAll();

    return res.status(200).json(products);
} catch (error) {
  console.error(error);
  return res.status(500).json({ message: 'Erro de Servidor' });
  }
};

const getProductById = async (req, res) => {
  try {
  const { id } = req.params;
  const product = await ProductsServices.getProductById(id);
  if (!product) {
    return res.status(404).send({ message: 'Product not found' });
  }
    return res.status(200).json(product);
} catch (error) {
  console.error(error);
  return res.status(500).json({ message: 'Erro de Servidor' });
}
};

module.exports = { getProductAll, getProductById };