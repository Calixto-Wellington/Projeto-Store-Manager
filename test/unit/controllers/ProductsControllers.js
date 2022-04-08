const sinon = require('sinon');
const { expect } = require('chai');

const ProductsController = require('../../../controllers/ProductsController');
const ProductsService = require('../../../services/ProductsService');

const { allProducts, productById } = require('../mocks/productsMock');

  describe('Ao chamar o controller de listagem de produtos', async () => {
    const response = {};
    const request = {};
    describe('Quando não existem produtos na base', async () => {
      before(() => {
        response.status = sinon.stub().returns(response);
        response.send = sinon.stub().returns();
        sinon.stub(ProductsService, 'getProductAll').resolves([]);
      });
  
      after(() => {
        ProductsService.getProductAll.restore();
      });
  
      it('Devolve status 404', async () => {
        await ProductsController.getProductAll(request, response);
        expect(response.status.calledWith(404)).to.be.equal(true)
      });
  
      it('Envia a mensagem e "Product not found"', async () => {
        const err = { code: 404, message: "Product not found" };
        try {
          await ProductsController.getProductAll(request, response);
        } catch (error) {
          expect(error).to.deep.equal(err);
        }
      });
    });
  
    describe('Quando existem produtos na base', async () => {
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(ProductsService, 'getProductAll').resolves([allProducts]);
      });
  
      after(async () => {
        ProductsService.getProductAll.restore();
      });
  
      it('Devolve status 200', async () => {
        await ProductsController.getProductAll(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true)
      });
  
      it('Retorna um objeto', async () => {
        await ProductsController.getProductAll(request,response);
        expect(response).to.be.an('object');
      });
    });
  });
  
  describe('Ao chamar o controller de busca por produto', async () => {
    const response = {};
    const request = {};
    request.params = { id: 1 };
    describe('Quando o produto da busca não existe na base', async () => {
      before(() => {
        response.status = sinon.stub().returns(response);
        response.send = sinon.stub().returns();
        sinon.stub(ProductsService, 'getProductById').resolves(false);
      });
  
      after(() => {
        ProductsService.getProductById.restore();
      });
  
      it('Devolve status 404', async () => {
       await ProductsController.getProductById(request, response);
        expect(response.status.calledWith(404)).to.be.equal(true)
      });
  
      it('Envia a mensagem e "Product not found"', async () => {
        const err = { code: 404, message: "Product not found" };
        try {
          await ProductsController.getProductById(request, response);
        } catch (error) {
          expect(error).to.deep.equal(err);
        }
      });
    });
  
    describe('Quando o produto da busca existe base', async () => {
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(ProductsService, 'getProductById').resolves([allProducts]);
      });
  
      after(async () => {
        ProductsService.getProductById.restore();
      });
  
      it('Devolve status 200', async () => {
        await ProductsController.getProductById(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true)
      });
  
      it('Retorna um objeto', async () => {
        await ProductsController.getProductById(request,response);
        expect(response).to.be.an('object');
      });
    });
  });