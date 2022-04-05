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
    FROM StoreManager.sales_products AS SP 
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
const createSales = async () => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW());',
    );
  return { id: result.insertId };
};

const createSalesProduct = async (sale) => {
  console.log(sale);
   const { id: saleId } = await createSales();
  const query = `
  INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);`;
  const result = sale.map((s) =>
   connection.execute(query, [saleId, s.productId, s.quantity]));
  await Promise.all(result);
 
  return {
    id: saleId,
    itemsSold: sale,
  };
};

const updateSales = async (sales, id) => {
  const consult = `UPDATE StoreManager.sales_products
  SET product_id = ?,
  quantity = ?
  WHERE
  sale_id = ?`;
  const result = sales
  .map((s) => connection
  .execute(consult, [s.productId, s.quantity, id]));
  await Promise.all(result);
  const resultObj = {
    saleId: id,
    itemUpdated: sales,
  };
  return resultObj;
};

const xablau = async (name) => {
const [result] = await connection
.query('SELECT * FROM StoreManager.products WHERE name = ?', [name]);
return result;
};

module.exports = { getSalesAll, getSaleById, createSalesProduct, updateSales, xablau };
