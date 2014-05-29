'use strict';

var traceur = require('traceur');
var dbg = traceur.require(__dirname + '/route-debugger.js');
var initialized = false;

module.exports = (req, res, next)=>{
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = traceur.require(__dirname + '/../routes/home.js');
  var users = traceur.require(__dirname + '/../routes/users.js');
  var portfolios = traceur.require(__dirname + '/../routes/portfolios.js');

  app.all('*', users.lookup);
  app.get('/', dbg, home.index);
  app.get('/about', dbg, home.about);
  app.get('/resume', dbg, home.resume);
  app.get('/contact', dbg, home.contact);
  app.get('/login', dbg, users.login);
  app.post('/login', dbg, users.authenticate);
  app.get('/logout', dbg, users.logout);
  app.get('/portfolio', dbg, portfolios.index);
  app.get('/portfolio/new', dbg, portfolios.new);
  app.post('/portfolio', dbg, portfolios.create);
  app.get('/portfolio/:id', dbg, portfolios.show);


  console.log('Routes Loaded');
  fn();
}
