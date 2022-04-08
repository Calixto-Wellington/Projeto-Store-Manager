const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../../models/ProductsModel');
const connection = require('../../../models/connection');

const newProduct = { "id": 1, "name": "produto", "quantity": 100 };
const noProducts = [[]];
const allProducts = [
  {
    "id": 1,
    "name": "A",
    "quantity": 100
  },
  {
    "id": 2,
    "name": "B",
    "quantity": 200
  }
];
const findProduct = {
  "id": 1,
  "name": "A",
  "quantity": 100
};

describe('Quando chamamos o model para cadastrar um produto', async () => {
  describe('Coloca o ID do novo produto', async () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Tras o produto', async () => {
      const result = await productsModel.createProduct(newProduct);
      expect(result.id).to.be.equals(1);
    });
  });
  describe('sucesso', async () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    });

    after(() => {
      connection.execute.restore();
    });
    it('Tras um objeto', async () => {
      const result = await productsModel.createProduct(newProduct);
      expect(result).to.be.a('object');
    });
    it('Tem o id no objeto', async () => {
      const result = await productsModel.createProduct(newProduct);
      expect(result).to.have.a.property('id');
    });
    it('Tem o name no objeto', async () => {
      const result = await productsModel.createProduct(newProduct);
      expect(result).to.have.a.property('name');
    });
    it('Tem quantity no objeto', async () => {
      const result = await productsModel.createProduct(newProduct);
      expect(result).to.have.a.property('quantity');
    });
  });
});