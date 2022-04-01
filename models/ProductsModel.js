const connection = require('./connection');

const getProductAll = async () => {
  try {
    const [rows] = await connection.query('SELECT * FROM products');
    return rows;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const getProductById = async (id) => {
  try {
  const [result] = await connection.query('SELECT * FROM products WHERE id = ?', [id]);
  if (!result.length) return null;
  return result[0];
} catch (err) {
  console.error(err);
  return process.exit(1);
 } 
};

const createProduct = async ({ name, quantity }) => {
  try {
    const [{ insertId }] = await connection
    .execute('INSERT INTO products (name, quantity) VALUES (?, ?)', [name, quantity]);
    return {
      id: insertId,
      name,
      quantity,
     
    }; 
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const updateProduct = async ({ id, name, quantity }) => {
  await connection.execute(`UPDATE products
  SET name = ?,
  quantity = ?
  WHERE
  id = ?`, [name, quantity, id]);
  return { id, name, quantity };
};

module.exports = { getProductAll, getProductById, createProduct, updateProduct };