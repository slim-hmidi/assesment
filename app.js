/* eslint-disable no-unused-vars */
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./server/routes/index');
const { handleError } = require('./server/utils/error');

const app = express();

app.use(bodyParser.json());
app.use('/', routes);


// handle errors
app.use((error, req, res, next) => {
  handleError(error, res);
});

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`server runs on 127.0.0.1:${port}`);
});
