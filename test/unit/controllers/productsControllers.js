const sinon = require('sinon');
const { expect } = require('chai');

const ProductsController = require('../../../controllers/ProductsController');
const ProductsService = require('../../../services/ProductsService');

const { allProducts, productByid } = require('../mocks/productsMock');

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
       expect(res.status.calleWith(200).to.be.equal(true));
     }); 
  });
  describe('Testa o retorno um produto baseado no id', () => {
    before(() => {
      sinon.stub(productService, 'listById').resolves(productById);
    });

    after(() => {
      productService.listById.restore();
    });

    it('retorna um objeto', async () => {
      await productsController.listById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
});