require('dotenv').config();
const express = require('express');

const ProductsRouter = require('./routers/ProductsRouter');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/', ProductsRouter);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
