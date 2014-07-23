/* jshint unused: false */

'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');

exports.index = (req, res)=>{
  res.render('home/index', {title: 'Kelley Stephens'});
};

exports.about = (req, res)=>{
  res.render('home/about', {title: 'About'});
};

exports.resume = (req, res)=>{
  res.render('home/resume', {title: 'Resume'});
};

exports.contact = (req, res)=>{
  res.render('home/contact', {title: 'Contact'});
};

exports.contactRequest = (req, res)=>{
  User.sendContactRequest(req.body, name=>{
    res.send(`Thank you #{name}! I will be in touch soon!`);
  });
};
