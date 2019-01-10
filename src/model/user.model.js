const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Loan = require('../model/loan.model');
const Product = require('../model/product.model');

const UserSchema = new Schema({
name: {
  type: String,
  required: [true,'the name is missing, please enter a name.']
},
username: {
  type: String,
  required: [true,'the username is missing, please enter a username.']
},
password: {
  type: String,
  required: [true,'the password is missing, please enter a password.']
},
isadmin: {
  type: Boolean,
  required: [true,'the password is missing, please enter a password.']
},
loans:[{
  type: Schema.Types.ObjectId,
  ref: "loan"
}],
products:[{
  type: Schema.Types.ObjectId,
  ref: "product"
}]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
