const sinon = require('sinon');
const { expect } = require('chai');

const SalesService = require('../../../services/SalesService');
// const SalesModel = require('../../../models/SalesModel');
const { getSaleById, allSales, noSales} = require('../mocks/salesMock');

describe('Ao chamar o models de listagem de vendas', async () => {
  describe('Quando não há vendas na base', async () => {
    before(() => {
      sinon.stub(SalesService, 'getSalesAll').resolves(noSales);
    });

    after(() => {
      SalesService.getSalesAll.restore();
    });

    it('Retorna um array', async () => {
      const result = await SalesService.getSalesAll();
      expect(result).to.be.an('array');
    });

    it('esse array retorna vazio', async () => {
      const result = await SalesService.getSalesAll();
      expect(result).to.be.empty;
    });
  });

  describe('Quando há vendas na base', async () => {
    before(() => {
      sinon.stub(SalesService, 'getSalesAll').resolves(allSales);
    });

    after(() => {
      SalesService.getSalesAll.restore();
    });

    it('Retorna um array', async () => {
      const result = await SalesService.getSalesAll();
      expect(result).to.be.an('array');
    });

    it('Este array contém todos os objetos', async () => {
      const result = await SalesService.getSalesAll();
      expect(result).not.to.be.empty;
      result.forEach(p => expect(p).to.be.an('object'));
    });

    it('Cada objeto do array contém as respectivas chaves: "saleId", "date", "productId", "quantity"', async () => {
      const result = await SalesService.getSalesAll();
      result.forEach(s => expect(s).to.include.all.keys('saleId', 'date', 'productId', 'quantity'));
    });
  });

  describe('Ao chamar o service de buscar uma venda', async () => {
    describe('Quando a venda pesquisada não existe na base', async () => {
      before(() => {
        sinon.stub(SalesService, 'getSaleById').resolves(noSales);
      });

      after(() => {
        SalesService.getSaleById.restore();
      });

      it('Retorna um array', async () => {
        const result = await SalesService.getSaleById(1);
        expect(result).to.be.an('array');
      });

      it('Este array é vazio', async () => {
        const result = await SalesService.getSaleById(1);
        expect(result).to.be.empty;
      });
    });

    describe('Quando a venda pesquisada existe na base', async () => {
      before(() => {
        sinon.stub(SalesService, 'getSaleById').resolves([getSaleById]);
      });

      after(() => {
        SalesService.getSaleById.restore();
      });

      it('Retorna um array', async () => {
        const result = await SalesService.getSaleById(1)
        expect(result).to.be.an('array');
      });
    });
  });
});                                                    