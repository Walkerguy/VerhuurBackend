const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const app = express();
const routes = require('./routes/routes');
var mongodb         = require('./config/mongo.db');

app.use(cors());

app.use(bodyParser.json());
routes(app);

app.use((err, req, res, next) =>{
  res.status(422).send({error: err.message});
});

module.exports = app;
