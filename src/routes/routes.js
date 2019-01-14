const UserController = require ('../controllers/user_controller')
const LoanController = require ('../controllers/loan_controller')
const ProductController = require ('../controllers/product_controller')


module.exports = (app) => {
  // //gamescontroller
  // app.get('/api', GamesController.greeting);
  // app.get('/api/games/:id',  GamesController.readById);
  // app.get('/api/games', GamesController.read);
  // app.post('/api/games',  GamesController.create);
  // app.put('/api/games/:id',  GamesController.edit);
  // app.delete('/api/games/:id',  GamesController.delete);
  // //app.put('/api/gamesPush/:id', GamesController.pushACompany);

  //userController
  app.get('/api/users/:id',  UserController.readById);
  app.get('/api/users', UserController.read);
  app.post('/api/users/register',  UserController.register);
  app.post('/api/users/authenticate',  UserController.authenticate);
  app.put('/api/users/:id',  UserController.edit);
  app.delete('/api/users/:id',  UserController.delete);
  app.put('/api/users/product/:id',  UserController.addProduct);
  app.put('/api/users/loan/:id',  UserController.addLoan);

  //productcontroller
  app.get('/api/products/:id',  ProductController.readById);
  app.get('/api/products',  ProductController.read);
  app.post('/api/products',  ProductController.create);
  app.put('/api/products/:id',  ProductController.edit);
  app.delete('/api/products/:id',  ProductController.delete);

  //LoanController
  app.get('/api/loans/:id',  LoanController.readById);
  app.get('/api/loans', LoanController.read);
  app.post('/api/loans',  LoanController.create);
  app.put('/api/loans/:id',  LoanController.edit);
  app.delete('/api/loans/:id',  LoanController.delete);
  //app.put('/api/companiesDevs/:id/',  LoanController.addDev);

};
