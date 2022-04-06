const validateProductId = (req, res, next) => {
  const [sale] = req.body;
  const { productId } = sale;

  if (!productId) return res.status(400).json({ message: '"productId" is required' });

  return next();
};

const validateQuantity = (req, res, next) => {
  const [sale] = req.body;
  const { quantity } = sale;

  if (!quantity && typeof quantity !== 'number') {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (typeof quantity === 'number' && quantity < 1) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  return next();
};

module.exports = { validateProductId, validateQuantity };