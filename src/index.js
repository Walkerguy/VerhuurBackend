const app = require('./app');
var environment     = require('./config/environment');

var port = process.env.PORT || 8080;

app.listen(environment.env.webPort,() =>{
  console.log('running on port ' + port );
});
