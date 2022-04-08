const { expect } = require('chai');
const sinon = require('sinon');

const SaleController = require('../../../controllers/SalesController');
const SaleService = require('../../../services/SalesService');
const { sales } = require('../../unit/mocks/mock');

const response = {};
const request = {};

describe('Sales Controllers', () => {
  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
  });

  describe('01 - requisição para pegar todas as vendas', () => {
    before(() => {
      sinon.stub(SaleService, 'getSalesAll').resolves(sales);
    });
    after(() => {
      SaleService.getSalesAll.restore();
    });

    it('se é retornado a mensagem de sucesso', async () => {
      await SaleController.getSalesAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(sales)).to.be.equal(true);
    });
  });

  describe('02 - requisição para pegar uma única venda', () => {
    request.params = {
      id: 2
    };

    const saleById = [
      {
        'date': '2022-04-04T05:00:27.000Z',
        'productId': 3,
        'quantity': 15
      }
    ]

    before(() => {
      sinon.stub(SaleService, 'getSaleById').resolves(saleById);
    });
    after(() => {
      SaleService.getSaleById.restore();
    });

    it('se é retornado a mensagem de sucesso', async () => {
      await SaleService.getSaleById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe('03 - se exibe o status de erro quando a venda é encontrada', () => {
    request.params = {
      id: 4
    };

    const errorMessage = 'Sale not found';

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SaleService, 'getSaleById').resolves({ error: 404});
    });

    after(async () => {
      SaleService.getSaleById.restore();
    });

    it('se é retornado o status com o código 404', async () => {
      await SaleController.getSaleById(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });
  });
})