const sinon = require('sinon');
const { expect } = require('chai');

const salesModel = require('../../../models/SalesModel');
const connection = require('../../../models/connection');

const noSales = [];
const allSales = [
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
const findSale = [
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
const newSale = {
  "id": 1,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 3
    }
  ]
};
const fakeSale =  [
  {
    "productId": 1,
    "quantity": 3
  }
]

describe('Quando chamo o model para gerar uma venda', async () => {
  describe('A busca não traz vendas', async () => {
    befores(() => {
      sinon.stub(connection, 'execute').resolves([noSales]);
    });

    after(() => {
      connection.execute.restore();
    })

    it('Tras um array sem nada', async () => {
      const result = await salesModel.getSaleById(1);
      expect(result).to.be.an('array');
    });

    it('array sem nada', async () => {
      const result = await salesModel.getSaleById(1);
      expect(result).to.be.empty;
    });
  });

 });

describe('Quando chamamos o model para cadastrar uma nova venda', () => {
  describe('Sucesso', async () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([newSale]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Tras um objeto', async () => {
      const result = await salesModel.createSalesProduct(fakeSale);
      expect(result).to.be.a('object');
    });
  });
});