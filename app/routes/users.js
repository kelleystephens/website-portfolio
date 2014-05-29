'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');

exports.login = (req, res)=>{
  res.render('users/login', {title: 'Login'});
};

exports.authenticate = (req, res)=>{
  User.login(req.body, u=>{
    if(u){
      req.session.userId = u._id;
      res.redirect('/portfolio');
    }else{
      req.session.userId = null;
      res.redirect('/login');

    }
  });
};

exports.lookup = (req, res, next)=>{
  User.findByUserId(req.session.userId, u=>{
    res.locals.user = u;
    next();
  });
};

exports.logout = (req, res)=>{
  req.session.userId = null;
  res.redirect('/portfolio');
};
