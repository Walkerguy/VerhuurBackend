const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://localhost/game_test',{ useNewUrlParser: true });
  mongoose.connection
    .once('open',() => { done(); })
    .on('error', (error)=>{
      console.warn("Warning",error);
    });
});

beforeEach((done) =>{
  const{companies,developers,games} = mongoose.connection.collections;
  games.drop(()=>{
    companies.drop(()=>{
      developers.drop(()=>{
        done();
      });
    });
  });
});
