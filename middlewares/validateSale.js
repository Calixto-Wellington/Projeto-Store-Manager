const validateSale = (req, res, next) => {
  const payload = [...req.body];
  
    payload.forEach(({ productId, quantity }) => {
      if (quantity < 1) {
        return res.status(422)
        .json({ message: '"quantity" must be greater than or equal to 1' });
      }
      if (!quantity) {
      return res.status(400)
      .json({ message: '"productId" is required' });
      }
      if (!productId) {
        return res.status(400)
        .json({ message: '"productId" is required' });
      }
    });

  next();
};

module.exports = {
  validateSale,
};