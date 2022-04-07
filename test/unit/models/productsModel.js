const sinon = require('sinon');
const { expect } = require('chai');

const ProductsModel = require('../../../models/ProductsModel');
const connection = require('../../../models/connection');
const { allProducts, productByid, createProduct } = require('../mocks/productsMock');

describe('Testa o retorno da rota /products', () => {
  describe('Testa o retorno de todos os produtos', async () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(allProducts);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Testa a existência de um array', async () => {
      const response = await ProductsModel.getProductAll();
      expect(response).to.be.a('array')
    });
    it('Testa o retorno de 3 produtos', async () => {
      const response = await ProductsModel.getProductAll();
      expect(response).to.have.length(3)
    });
  });
  describe('Testa o retorno de produto pelo ID', async () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(productByid);
    });
    after(() => {
      connection.execute.restore();
    })
    it('Testa o retorno de um objeto', async () => {
      const response = await ProductsModel.getProductById(1);
      expect(response).to.be.a('object');
    });
  })
  describe('Testa a criação de um produto', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(createProduct);
      sinon.stub(ProductsModel, 'create').resolves(createProduct);
    });
      after(() => {
        connection.execute.restore();
      })
      it('Testa o retorno de um objeto', async () => {
        const response = await ProductsModel.createProduct({ name: 'Espada Justiceira', quantity: 40 });
      });
  })
});