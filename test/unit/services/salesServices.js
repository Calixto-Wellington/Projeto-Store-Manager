const sinon = require('sinon');
const { expect } = require('chai');

const SalesService = require('../../../services/SalesService');
const SalesModel = require('../../../models/SalesModel');
const { getSaleById, allSales, } = require('../mocks/salesMock');

describe('Verifica se a rota /sales retorna as vendas corretamente', () => {
  describe('retorna todas as vendas', async () => {
    before(() => {
      sinon.stub(SalesModel, 'getSalesAll').resolves(allSales);
    });

    after(() => {
      SalesModel.getSalesAll.restore();
    });

    it('Testa o array', async () => {
      const response = await SalesService.getSalesAll();
      expect(response).to.be.a('array')
    });

    it('Testa o retorno de um produto', async () => {
      const response = await SalesService.getSalesAll();
      expect(response).to.have.length(1)
    });
  });
  describe('Testa o retorno de um produto pelo id' , () => {
    before(() => {
      sinon.stub(SalesModel, 'getSaleById').resolves(getSaleById);
    });

    after(() => {
      SalesModel.getSaleById.restore();
    });

    it('Testa o retorno de um objeto', async () => {
      const response = await SalesService(2);
      expect(response).to.be.a('array');
    });
  });
});                                                          