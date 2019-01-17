const UserController = require ('../controllers/user_controller')
const LoanController = require ('../controllers/loan_controller')
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
  app.put('/api/users/loan/:id',  UserController.addLoan);

  //Productcontroller
  app.get('/api/products/:id',  ProductController.readById);
  app.get('/api/products',  ProductController.read);
  app.post('/api/products',  ProductController.create);
  app.put('/api/products/:id',  ProductController.edit);
  app.delete('/api/products/:id',  ProductController.delete);

  //LoanController
  app.get('/api/loans/:id',  LoanController.readById);
  app.put('/api/loans/product/:id',LoanController.addProduct) )
  app.get('/api/loans', LoanController.read);
  app.post('/api/loans',  LoanController.create);
  app.put('/api/loans/:id',  LoanController.edit);
  app.delete('/api/loans/:id',  LoanController.delete);

};
