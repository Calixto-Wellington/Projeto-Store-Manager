const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const salesModel = require('../../../models/SalesModel');
const { allSales, getSaleById, createSale, noSales } = require('../mocks/salesMock');

describe('Ao chamar o model de listagem de vendas', async () => {
  describe('Quando não há vendas na base', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([noSales]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorn um array', async () => {
      const result = await salesModel.getSalesAll();
      expect(result).to.be.an('array');
    });

    it('Este array é vazio', async () => {
      const result = await salesModel.getSalesAll();
      expect(result).to.be.empty;
    });
  });

  describe('Quando existem vendas na base', async () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([allSales]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorn um array', async () => {
      const result = await salesModel.getSalesAll();
      expect(result).to.be.an('array');
    });

    it('Este array lista todas as vendas', async () => {
      const result = await salesModel.getSalesAll();
      expect(result).not.to.be.empty;
      result.forEach(s => expect(s).to.be.an('object'));
    });

    it('Cada objeto do array contem as respectivas chaves: "date", "productId", "quantity"', async () => {
      const result = await salesModel.getSalesAll();
      result.forEach(p => expect(p).to.include.all.keys('date', 'productId', 'quantity'));
    });
  });
});

describe('Ao chamar o model de buscar uma venda', async () => {
  describe('Quando a venda da busca não existe', async () => {
    befores(() => {
      sinon.stub(connection, 'execute').resolves([noSales]);
    });

    after(() => {
      connection.execute.restore();
    })

    it('Retorna um array', async () => {
      const result = await salesModel.getSaleById(1);
      expect(result).to.be.an('array');
    });

    it('Este array é vazio', async () => {
      const result = await salesModel.getSaleById(1);
      expect(result).to.be.empty;
    });
  });

  describe('Quando a venda da busca existe', async () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(getSaleById);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um objeto', async () => {
      const result = await salesModel.getSaleById(1);
      expect(result).to.be.an('object');
    });
  });
});

describe('Ao chamar o model de cadastrar uma nova venda', () => {
  describe('Quando é cadastrado com sucesso', async () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([createSale]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um objeto', async () => {
      const result = await salesModel.createSalesProduct(createSale);
      expect(result).to.be.a('object');
    });
  });
});