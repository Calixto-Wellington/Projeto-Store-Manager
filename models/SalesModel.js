const connection = require('./connection');

const getNewSale = ({ saleId, date, productId, quantity }) => ({
    saleId,
    date,
    productId,
    quantity,
    });

  const serialize = (saleData) => ({
      saleId: saleData.sale_id,
      date: saleData.date,
      productId: saleData.product_id,
      quantity: saleData.quantity,
    });

    const getNewSaleById = ({ date, productId, quantity }) => ({
      date,
      productId,
      quantity,
      });

    const serializeById = (saleDataById) => ({
        date: saleDataById.date,
        productId: saleDataById.product_id,
        quantity: saleDataById.quantity,
      });

const getSalesAll = async () => {
  try {
    const [rows] = await connection
    .query(
    `SELECT SP.sale_id, DT.date, SP.product_id, SP.quantity 
    FROM sales_products AS SP 
    JOIN sales AS DT 
    ON SP.sale_id = DT.id;`,
);

     return rows.map(serialize).map(getNewSale);
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const getSaleById = async (id) => {
  try {
  const [result] = await connection
  .query(
    `SELECT SP.sale_id, DT.date, SP.product_id, SP.quantity 
    FROM sales_products AS SP 
    JOIN sales AS DT 
    ON SP.sale_id = DT.id 
    WHERE id = ? 
    ORDER BY SP.sale_id, SP.product_id`, [id],
);
  if (!result.length) return null;
    return result.map(serializeById).map(getNewSaleById);
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const createSalesProduct = async (sale) => {
  const saleIdQuery = 'INSERT INTO sales (date) VALUES (now())';
  const [saleId] = await connection.execute(saleIdQuery);

  const salesProductsQuery = `INSERT INTO StoreManager.sales_products
   (sale_id, product_id, quantity) VALUES (?, ?, ?)`;

  await sale.map(({ productId, quantity }) => connection
    .execute(salesProductsQuery, [saleId.insertId, productId, quantity]));

  return {
    id: saleId.insertId,
    itemsSold: sale,
  };
};

module.exports = { getSalesAll, getSaleById, createSalesProduct };