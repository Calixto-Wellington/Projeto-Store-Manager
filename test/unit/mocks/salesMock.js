const allSales = [[
  {
    "saleId": 1,
    "date": "2022-04-01T00:03:01.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2022-04-01T00:03:01.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2022-04-01T00:03:01.000Z",
    "productId": 3,
    "quantity": 15
  }
]];

const getSaleById = [[
  {
    "date": "2022-04-01T00:03:01.000Z",
    "productId": 3,
    "quantity": 15
  }
]];

const createSale = [{
  "saleId": "1",
  "itemUpdated": [
    {
      "productId": 1,
      "quantity": 10
    }
  ]
}];

module.exports = {
  getSaleById,
  allSales,
  createSale
}