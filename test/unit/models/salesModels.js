const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const salesModel = require('../../../models/SalesModel');
const { allSales, getSaleById, createSale } = require('../mocks/salesMock');

describe('Testa o retorno da rota /sales', () => {
  describe('Testa o retorno de todas as vendas', async () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(allSales);
    });
    after(() => {
      connection.execute.restore();
    }); 
    it('Testa a existência de um array', async () => {
      const response = await salesModel.getSalesAll ();
      expect(response).to.be.a('array')
    });
   });
   describe('Testa o retorno de uma venda pelo ID', async () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(getSaleById);
    });
    after(() => {
      connection.execute.restore();
    })
    it('Testa o retorno de um array', async () => {
      const response = await ProductsModel.getSaleById(1);
      expect(response).to.be.a('array');
    });
  })
  describe('Testa a criação de uma venda', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(createSale);
      sinon.stub(ProductsModel, 'create').resolves(createSale);
    });
      after(() => {
        connection.execute.restore();
      })
      it('Testa o retorno de um array', async () => {
        const response = await salesModel.create([
          {
            "productId": 1,
            "quantity": 1
          }
        ]);
        expect(response).to.be.a('array');
    });
  });
});