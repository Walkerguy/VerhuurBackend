const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true });
  mongoose.connection
    .once('open',() => { done(); })
    .on('error', (error)=>{
      console.warn("Warning",error);
    });
});

beforeEach((done) =>{
  const{rents,users,products} = mongoose.connection.collections;
  rents.drop(()=>{
    users.drop(()=>{
      products.drop(()=>{
        done();
      });
    });
  });
});
