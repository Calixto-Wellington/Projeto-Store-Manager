const ProductsServices = require('../services/ProductsService');

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

const getProductAll = async (_req, res) => {
  try {
    const products = await ProductsServices.getProductAll();

    return res.status(200).json(products);
} catch (error) {
  console.error(error);
  return res.status(500).json({ message: 'Erro' });
  }
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body; 
  try { 
    const nome = await ProductsServices.getByNames({ name });
      if (nome.length !== 0) {
     return res.status(409).send({ message: 'Product already exists' });
     }
    const products = await ProductsServices.createProduct({ name, quantity });
    return res.status(201).json(products);
  } catch (error) {
   console.error(error);
   return res.status(500).json({ message: 'Erro de Servidor' });
    }
};

const updateProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;
    const product = await ProductsServices.getProductById(id);
  if (!product) {
    return res.status(404).send({ message: 'Product not found' });
  }
  const products = await ProductsServices.updateProduct({ id, name, quantity });
  return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro de Servidor' });
     }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await ProductsServices.getProductById(id);
  if (!product) {
    return res.status(404).send({ message: 'Product not found' });
  }
  await ProductsServices.deleteProduct(id);
  return res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro de Servidor' });
     }
};

module.exports = { getProductAll, getProductById, createProduct, updateProduct, deleteProduct };