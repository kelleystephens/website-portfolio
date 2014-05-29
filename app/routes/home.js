'use strict';

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
