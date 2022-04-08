const sinon = require('sinon');
const { expect } = require('chai');

const salesServices = require('../../../services/SalesService');
const salesModels = require('../../../models/SalesModel');

const allSales = [
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }
];
const noSales = [];
const  findSale = [
  {
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }
];

describe('Ao chamar o models de listagem de vendas', async () => {
  describe('Quando não há vendas na base', async () => {
    before(() => {
      sinon.stub(salesModels, 'getSalesAll').resolves(noSales);
    });

    after(() => {
      salesModels.getSalesAll.restore();
    });

    it('Retorna um array', async () => {
      const result = await salesServices.getSalesAll();
      expect(result).to.be.an('array');
    });

    it('esse array retorna vazio', async () => {
      const result = await salesServices.getSalesAll();
      expect(result).to.be.empty;
    });
  });

  describe('Quando há vendas na base', async () => {
    before(() => {
      sinon.stub(salesModels, 'getSalesAll').resolves(allSales);
    });

    after(() => {
      salesModels.getSalesAll.restore();
    });

    it('Retorna um array', async () => {
      const result = await salesServices.getSalesAll();
      expect(result).to.be.an('array');
    });

    it('Este array contém todos os objetos', async () => {
      const result = await salesServices.getSalesAll();
      expect(result).not.to.be.empty;
      result.forEach(p => expect(p).to.be.an('object'));
    });

    it('Cada objeto do array contém as respectivas chaves: "saleId", "date", "productId", "quantity"', async () => {
      const result = await salesServices.getSalesAll();
      result.forEach(s => expect(s).to.include.all.keys('saleId', 'date', 'productId', 'quantity'));
    });
  });

  describe('Ao chamar o service de buscar uma venda', async () => {
    describe('Quando a venda pesquisada não existe na base', async () => {
      before(() => {
        sinon.stub(salesModels, 'getSaleById').resolves(noSales);
      });

      after(() => {
        salesModels.getSaleById.restore();
      });

      it('Retorna um array', async () => {
        const result = await salesServices.getSaleById(1);
        expect(result).to.be.an('array');
      });

      it('Este array é vazio', async () => {
        const result = await salesServices.getSaleById(1);
        expect(result).to.be.empty;
      });
    });

    describe('Quando a venda pesquisada existe na base', async () => {
      before(() => {
        sinon.stub(salesModels, 'getSaleById').resolves([findSale]);
      });

      after(() => {
        salesModels.getSaleById.restore();
      });

      it('Retorna um array', async () => {
        const result = await salesServices.getSaleById(1)
        expect(result).to.be.an('array');
      });
    });
  });
});