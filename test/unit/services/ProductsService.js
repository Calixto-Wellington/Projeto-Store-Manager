const { expect } = require('chai');
const sinon = require('sinon');

const ProductService = require('../../../services/ProductsService');
const ProductModel = require('../../../models/ProductsModel');
const { products } = require('../mocks/mock');

describe('Products Services', () => {
  describe('01 - quando buscamos por todos os produtos', () => {
    before(() => {
      sinon.stub(ProductModel, 'getProductAll').resolves(products);
      sinon.stub(ProductModel, 'getProductById').resolves(products);
    });

    after(() => {
      ProductModel.getProductAll.restore();
      ProductModel.getProductById.restore();
    });

    it('se é retornado um array', async () => {
      const result = await ProductService.getProductAll();
      expect(result).to.be.a('array');
    });

    it('se existe um objeto com as propriedades do produto', async () => {
      const result = await ProductService.getProductAll();
      expect(result[0]).to.include(
        {
          id: 1,
          name: 'Martelo de Thor',
          quantity: 10
        }
      );
    });
  })

  describe('02 - quando buscamos por um único produto', () => {
    before(() => {
      sinon.stub(ProductModel, 'getProductAll').resolves(products);
      sinon.stub(ProductModel, 'getProductById').resolves(products);
    });

    after(() => {
      ProductModel.getProductAll.restore();
      ProductModel.getProductById.restore();
    });

    // it('se é retornado um objeto', async () => {
    //   const result = await ProductService.getProductById(1);
    //   expect(result).to.be.a('object');
    // });

    it('se existe um objeto com as propriedades do produto', async () => {
      const result = await ProductService.getProductAll();
      expect(result[0]).to.include(
        {
          id: 1,
          name: 'Martelo de Thor',
          quantity: 10
        }
      );
    });
  })
 
  describe('03 - quando cadastramos um novo produto no banco de dados:', () => {
    const mockProducts = [
      { id: 1, name: 'Martelo de Thor', quantity: 10 },
      { id: 2, name: 'Traje de encolhimento', quantity: 20 },
      { id: 3, name: 'Escudo do Capitão América', quantity: 30 }
    ];
    const mockProductCreated = {
      id: 4,
      name: 'produtoAbx',
      'quantity': 30
    }
    const productCreateError = { error: 409, message: 'Product already exists' };

    before(() => {
      sinon.stub(ProductModel, 'getProductAll').resolves(mockProducts);
      sinon.stub(ProductModel, 'createProduct').resolves(mockProductCreated);
    });
    after(() => {
      ProductModel.getProductAll.restore();
      ProductModel.createProduct.restore();
    });

    it('se é retornado um objeto com as informações do produto', async () => {
      const result = await ProductService.createProduct({ name: 'produtoAbx', 'quantity': 30 });
      expect(result).to.be.an('object');
      expect(result).to.deep.equal(mockProductCreated);
    });

    it('se é retornado erro 409 com a mensagem "Product already exists"', async () => {
      const result = await ProductService.createProduct({ name: 'Traje de encolhimento', 'quantity': 12 });
      expect(result).to.deep.equal(productCreateError);
    });
  })

  describe('04 - quando atualizamos um novo produto no banco de dados:', () => {
    const mockProducts = [
      { id: 1, name: 'Martelo de Thor', quantity: 10 },
      { id: 2, name: 'Traje de encolhimento', quantity: 20 },
      { id: 3, name: 'Escudo do Capitão América', quantity: 30 }
    ];
    const productUpdateError = { error: 404, message: 'Product not found' };

    before(() => {
      sinon.stub(ProductModel, 'getProductAll').resolves(mockProducts);
    });
    after(() => {
      ProductModel.getProductAll.restore();
    });

    it('se é retornado erro 404 com a mensagem "Product not found" quando não encontrar o id', async () => {
      const result = await ProductService.updateProduct(5, { name: 'produtoAbx', quantity: 15 });
      expect(result).to.deep.equal(productUpdateError);
    });
  })
})