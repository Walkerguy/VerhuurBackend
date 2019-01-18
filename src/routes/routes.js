const UserController = require ('../controllers/user_controller')
const RentController = require ('../controllers/rent_controller')
const ProductController = require ('../controllers/product_controller')

var passport = require('passport');



module.exports = (app) => {

  //UserController
  app.get('/api/users/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});});
  app.post('/api/users/register',  UserController.register);
  app.post('/api/users/authenticate',  UserController.authenticate);
  // app.put('/api/users/:id',  UserController.edit);
  // app.delete('/api/users/:id',  UserController.delete);
  app.put('/api/users/product/:id',  UserController.addProduct);
  app.put('/api/users/rent/:id',  UserController.addRent);
  app.get('/api/users/:id',  UserController.readById);
  app.get('/api/users',  UserController.read);

  //Productcontroller
  app.get('/api/products/:id',  ProductController.readById);
  app.get('/api/products',  ProductController.read);
  app.post('/api/products',  ProductController.create);
  app.put('/api/products/:id',  ProductController.edit);
  app.delete('/api/products/:id',  ProductController.delete);

  //RentController
  app.get('/api/rents/:id',  RentController.readById);
  app.put('/api/rents/product/:id',RentController.addProduct);
  app.get('/api/rents', RentController.read);
  app.post('/api/rents',  RentController.create);
  app.put('/api/rents/:id',  RentController.edit);
  app.delete('/api/rents/:id',  RentController.delete);

};
