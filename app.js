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
module.exports = app;
