const sinon = require('sinon');
const { expect } = require('chai');

const ProductsModel = require('../../../models/ProductsModel');
const connection = require('../../../models/connection');
const { allProducts, productByid, createProduct, noProducts } = require('../mocks/productsMock');

describe('Ao chamar o model de listagem de produtos', async () => {
  describe('Quando não há produtos na base', async () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(noProducts);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um array', async () => {
      const result = await ProductsModel.getProductAll();
      expect(result).to.be.an('array');
    });

    it('Este array é vazio', async () => {
      const result = await ProductsModel.getProductAll();
      expect(result).to.be.empty;
    });
  });

  describe('Quando existem produtos na base', async () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([allProducts]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um array', async () => {
      const result = await ProductsModel.getProductAll();
      expect(result).to.be.an('array');
    });

    it('Dentro deste array lista todos os produtos', async () => {
      const result = await ProductsModel.getProductAll();
      expect(result).not.to.be.empty;
      result.forEach(p => expect(p).to.be.an('object'));
    });

    it('Cada objeto do array contem as respectivas chaves: "id", "name", "quantity"', async () => {
      const result = await ProductsModel.getProductAll();
      result.forEach(p => expect(p).to.include.all.keys('id', 'name', 'quantity'));
    });
  });
});

describe('Ao chamar o model para buscar um produto', async () => {
  describe('Quando o produto da busca não existe', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(noProducts);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um array', async () => {
      const result = await ProductsModel.getProductAll();
      expect(result).to.be.an('array');
    });

    it('Este array é vazio', async () => {
      const result = await ProductsModel.getProductAll();
      expect(result).to.be.empty;
    });
  });

  describe('Quando o produto da busca existe', async () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([productByid]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um objeto', async () => {
      const result = await ProductsModel.productByid(1);
      expect(result).to.be.an('object');
    });

    it(' Este objeto contém as respectivas chaves: "id", "name", "quantity"', async () => {
      const result = await ProductsModel.productByid(1);
      expect(result).to.include.all.keys('id', 'name', 'quantity');
    });
  });
});

describe('Ao chamar o model de cadastrar um produto', async () => {
  describe('Insere o id referente ao novo produto', async () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna o produto', async () => {
      const result = await ProductsModel.createProduct(createProduct);
      expect(result.id).to.be.equals(1);
    });
  });
  describe('Quando é cadastrado com sucesso', async () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    });

    after(() => {
      connection.execute.restore();
    });
    it('Retorna um objeto', async () => {
      const result = await ProductsModel.createProduct(createProduct);
      expect(result).to.be.a('object');
    });
    it('O objeto retornado contém a propriedade id', async () => {
      const result = await ProductsModel.createProduct(createProduct);
      expect(result).to.have.a.property('id');
    });
    it('O objeto retornado contém a propriedade name', async () => {
      const result = await ProductsModel.createProduct(createProduct);
      expect(result).to.have.a.property('name');
    });
    it('O objeto retornado contém a propriedade quantity', async () => {
      const result = await ProductsModel.createProduct(createProduct);
      expect(result).to.have.a.property('quantity');
    });
  });
});