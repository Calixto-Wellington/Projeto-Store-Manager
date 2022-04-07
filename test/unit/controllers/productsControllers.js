const sinon = require('sinon');
const { expect } = require('chai');

const ProductsController = require('../../../controllers/ProductsController');
const ProductsService = require('../../../services/ProductsService');

const { allProducts, productById } = require('../mocks/productsMock');

describe('Testa a rota /products retornando', () => {
  const res = {};
  const req = {};

  before(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
  });

  describe('Testa o retorno de todos os produtos', async () => {
    before(() => {
      sinon.stub(ProductsService, 'getProductAll').resolves(allProducts);
    });

     after(() => {
       ProductsService.getProductAll.restore();
     });
     
     it('Testamos o status 200', async () => {
       await ProductsController.getProductAll(req, res);
       expect(res.status.calledWith(200)).to.be.equal(true);
       expect(res.json.calledWith(allProducts)).to.be.equal(true);
     }); 
  });
  describe('Testa o retorno de um produto baseado no id', () => {
    before(() => {
      sinon.stub(ProductsService, 'getProductById').resolves(productById);
    });

    after(() => {
      ProductsService.getProductById.restore();
    });

    it('retorna um objeto', async () => {
      await ProductsController.getProductById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
});