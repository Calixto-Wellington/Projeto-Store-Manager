const SalesServices = require('../services/SalesService');

const getSalesAll = async (_req, res) => {
  try {
    const sales = await SalesServices.getSalesAll();
    
    return res.status(200).json(sales);
} catch (error) {
  console.error(error);
  return res.status(500).json({ message: 'Erro de Servidor' });
  }
};

const getSaleById = async (req, res) => {
  try {
  const { id } = req.params;
  const sale = await SalesServices.getSaleById(id);
  if (!sale) {
    return res.status(404).send({ message: 'Sale not found' });
  }
    return res.status(200).json(sale);
} catch (error) {
  console.error(error);
  return res.status(500).json({ message: 'Erro de Servidor' });
}
};

const createProductSales = async (req, res) => {
  try {
    const createSale = await SalesServices.createProductSales(req.body);
    return res.status(201).json(createSale);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro de Servidor' });
  }
};

module.exports = { getSalesAll, getSaleById, createProductSales };