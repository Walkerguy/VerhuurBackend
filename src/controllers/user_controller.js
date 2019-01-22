const User = require('../model/user.model');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/environment');

module.exports = {



  greeting(req, res) {
    res.send({ hi: 'there' })
  },

  //Register
  register(req, res, next) {
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      isAdmin: req.body.isAdmin

    });

    User.createUser(newUser, (err, user) => {
      console.log(newUser);
      if (err) {
        res.json({ success: false, msg: 'Failed to register user' });

      } else {
        res.json({ success: true, msg: 'User registered' });
      }
    });
  },

  //Authenticate
  authenticate(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
      if (err) throw err;
      if (!user) {
        return res.json({ success: false, msg: "User not found" });

      }

      User.comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          const token = jwt.sign(user.toJSON(), config.secret, {
            expiresIn: 604800

          });
          res.json({
            success: true,
            token: 'Bearer ' + token,
            user: {
              id: user._id,
              username: user.username,
              email: user.email,
              isAdmin: user.isAdmin

            }
          });
        } else {
          return res.json({ success: false, msg: "Wrong Password bruv" });
        }
      });
    });
  },

  // edit(req, res, next) {
  //   const userId = req.params.id;
  //   const userProps = req.body;
  //   User.findByIdAndUpdate({ _id: userId }, userProps)
  //     .then(() => User.findById({ _id: userId }))
  //     .then(user => res.send(user))
  //     .catch(next);
  // },

  // delete(req, res, next) {
  //   const userId = req.params.id;
  //   User.findByIdAndRemove({ _id: userId })
  //     .then(user => res.status(204).send(user))
  //     .catch(next);
  // },

  
  addProduct(req, res, next) {
    const userId = req.params.id;
    const product = req.body._id; 
    User.findByIdAndUpdate({ _id: userId },
      { $push: { products: product } })
      .then((user) => res.status(200).send(user))
      .catch(next);
  },

  addRent(req, res, next) {
    const userId = req.params.id;
    const rent = req.body._id;
    User.findByIdAndUpdate({ _id: userId },
      { $push: { rents: rent } })
      .then((user) => res.status(200).send(user))
      .catch(next);
  },
  // read(req,res,next){
  //   User.find({})
  //   .populate('products')
  //   .populate('rents')
  //   .then((user) => res.status(200).send(user))
  //   .catch(next);
  // },

  // readById(req,res,next){
  //   const userId = req.params.id;
  //   User.findById({_id: userId})
  //   .populate('products')
  //   .populate('rents')
  //   .then((user) => res.status(200).send(user))
  //   .catch(next);
  // },
};
