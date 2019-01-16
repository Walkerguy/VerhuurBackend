const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const Loan = require('../model/loan.model');
const Product = require('../model/product.model');

const UserSchema = mongoose.Schema({
name: {
  type: String,
  required: [true,'the name is missing, please enter a name.']
},
email: {
  type: String,
  required: true
},
username: {
  type: String,
  required: [true,'the username is missing, please enter a username.']
},
password: {
  type: String,
  required: [true,'the password is missing, please enter a password.']
},
isAdmin: {
  type: Boolean,
  required: false
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

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
  const query = {username: username}
  User.findOne(query, callback);
}

module.exports.createUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        // console.log(hash);
         if(err) throw err;
          newUser.password = hash;
          newUser.save(callback);
      });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
     if(err) throw err;
     callback(null, isMatch);
  });
}