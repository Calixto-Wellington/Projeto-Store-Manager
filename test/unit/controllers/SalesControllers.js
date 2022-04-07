const sinon = require('sinon');
const { expect } = require('chai');

const SalesController = require('../../../controllers/SalesController');
const SalesService = require('../../../services/SalesService');
const { getSaleById, allSales, } = require('../mocks/salesMock');

describe('Testa a rota /sales retorna as vendas', () => {
  const res = {};
  const req = {};

  before(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
  });

  describe('Testa o retorno das vendas', async () => {
    before(() => {
      sinon.stub(SalesService, 'getSalesAll').resolves(allSales);
    });

    after(() => {
      SalesService.getSalesAll.restore();
    });

    it('Testa o status 200', async () => {
      await SalesController.getSalesAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(allSales)).to.be.equal(true);
    });
  });
  describe('Testa o produto pelo id', () => {
    before(() => {
      sinon.stub(SalesService, 'getSaleById').resolves(getSaleById);
    });

    after(() => {
      SalesService.getSaleById.restore();
    });

    it('Testa o retorno de um objeto', async () => {
      await SalesController.getSaleById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
});        