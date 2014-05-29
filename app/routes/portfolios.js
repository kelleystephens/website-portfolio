/* jshint unused:false */

'use strict';

var multiparty = require('multiparty');
var traceur = require('traceur');
var Project = traceur.require(__dirname + '/../models/project.js');
var Mongo = require('mongodb');
var projects = global.nss.db.collection('projects');

exports.index = (req, res)=>{
  res.render('portfolios/index', {title: 'Portfolio'});
};

exports.new = (req, res)=>{
  res.render('portfolios/new', {title: 'Portfolio: New'});
};


exports.create = (req, res)=>{
    var form = new multiparty.Form();  //this is just how you use multiparty to pull pics

  form.parse(req, (err, fields, files)=>{    //req is object that came from the browser, files are the pics, fields are where the other inputs are
    var project = new Project(fields, files, req.session.userId);
    project.new(files.photo, p=>{
      res.redirect(`/portfolio/${p._id}`);
    });
  });
};

exports.show = (req, res)=>{
  var _id = Mongo.ObjectID(req.params.id);
  projects.findOne({_id:_id}, (e, p)=>res.render('portfolios/show', {photos: p.photos, project: p, title: p.title}));
};
