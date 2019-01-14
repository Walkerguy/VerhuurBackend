const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const app = express();
const routes = require('./routes/routes');
var mongodb = require('./config/mongo.db');
var passport = require('passport');


app.use(cors());

app.use(bodyParser.json());
routes(app);

//PASSPORT middleware

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use((err, req, res, next) =>{
  res.status(422).send({error: err.message});
});

module.exports = app;
