const sinon = require('sinon');
const { expect } = require('chai');

const ProductsService = require('../../../services/ProductsService');
const ProductModel = require('../../../models/ProductsModel');
const { allProducts, productById } = require('../mocks/productsMock');

describe('Testa a rota /products retorna os produtos', () => {
  describe('Testa o retorno de todos os produtos', async () => {
    before(() => {
      sinon.stub(ProductModel, 'getProductAll').resolves(allProducts);
    });

    after(() => {
      ProductModel.getProductAll.restore();
    });

    it('Testa o array', async () => {
      const response = await ProductsService.getProductAll();
      expect(response).to.be.a('array')
    });

    it('Testa o retorno de um produto', async () => {
      const response = await ProductsService.getProductAll();
      expect(response).to.have.length(1)
    });
  });
  describe('Testa o retorno de um produto pelo id', () => {
    before(() => {
      sinon.stub(ProductModel, 'getProductById').resolves(productById);
    });

    after(() => {
      ProductModel.getProductById.restore();
    });

    it('Testa o retorno de um objeto', async () => {
      const response = await ProductsService.getProductById(2);
      expect(response).to.be.a('object');
    });
  });
});