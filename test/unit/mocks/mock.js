const mock = {
  products: [
    {
      "id": 1,
      "name": "Martelo de Thor",
      "quantity": 10
    },
    {
      "id": 2,
      "name": "Traje de encolhimento",
      "quantity": 20
    },
    {
      "id": 3,
      "name": "Escudo do Capitão América",
      "quantity": 30
    }
  ],
  sales: [
    {
      id: 1,
      date: '2022-04-02T21:49:43.000Z',
      sale_id: 1,
      product_id: 1,
      quantity: 5
    },
    {
      id: 1,
      date: '2022-04-02T21:49:43.000Z',
      sale_id: 1,
      product_id: 2,
      quantity: 10
    },
    {
      id: 2,
      date: '2022-04-02T21:49:43.000Z',
      sale_id: 2,
      product_id: 3,
      quantity: 15
    }
  ]
};

module.exports = mock;