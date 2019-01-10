const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes/routes')
var cors = require("cors");
var logger = require('morgan');

mongoose.Promise = global.Promise;

app.use(cors());

if(process.env.NODE_ENV !== 'test'){
  mongoose.connect('mongodb://testuser:Welkom1@ds035026.mlab.com:35026/loans');
}

app.use(bodyParser.json());
routes(app);

app.use((err, req, res, next) =>{
  res.status(422).send({error: err.message});
});

module.exports = app;
