const ProductsServices = require('../services/ProductsServices');

const getAll = async (_req, res) => {
  try {
    const products = await ProductsServices.getAll();

    return res.status(200).json(products);
} catch (error) {
  console.error(error);
  return res.status(500).json({ message: 'Erro de Servidor' });
  }
};

const getById = async (req, res) => {
  try {
  const { id } = req.params;

  const product = await ProductsServices.getById(id);
  if (!product) {
    return res.status(404).send({ message: `Product not found  ${id}` });
  }
    return res.status(200).json(product);
} catch (error) {
  console.error(error);
  return res.status(500).json({ message: 'Erro de Servidor' });
}
};

module.exports = { getAll, getById };