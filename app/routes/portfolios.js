/* jshint unused:false */

'use strict';

var multiparty = require('multiparty');
var traceur = require('traceur');
var Project = traceur.require(__dirname + '/../models/project.js');

exports.index = (req, res)=>{
  Project.findAll(projects=>{
    res.render('portfolios/index', {projects:projects, title: 'Portfolio'});
  });
};

exports.new = (req, res)=>{
  res.render('portfolios/new', {title: 'Portfolio: New'});
};


exports.create = (req, res)=>{
    var form = new multiparty.Form();  //this is just how you use multiparty to pull pics

  form.parse(req, (err, fields, files)=>{    //req is object that came from the browser, files are the pics, fields are where the other inputs are
    var project = new Project(fields, files, req.session.userId);
    project.new(files.photo, p=>{
      res.redirect(`/portfolio/${project._id}`);
    });
  });
};

exports.show = (req, res)=>{
  Project.findById(req.params.id, project=>{
    res.render('portfolios/show', {photos: project.photos, project: project, title: project.title});
  });
};

exports.remove = (req, res)=>{
  Project.findAndRemove(req.params.id, ()=>{
    res.redirect('/portfolio');
  });
};

exports.update = (req, res)=>{
  Project.findById(req.params.id, project=>{
    project.update(req.body, p=>{
      res.send({msg: 'update complete'});
    });
  });
};

exports.removePic = (req, res)=>{
  Project.findById(req.params.id, project=>{
    project.deletePic(req.body.photo, p=>{
      res.redirect(`/portfolio/${project._id}`);
    });
  });
};

exports.makePrimary = (req, res)=>{
  Project.findById(req.params.id, project=>{
    project.setPrimary(req.body.photo, p=>{
      res.redirect(`/portfolio/${project._id}`);
    });
  });
};

exports.addPic = (req, res)=>{
  var form = new multiparty.Form();
  form.parse(req, (err, fields, files)=>{
    Project.findById(req.params.id, project=>{
      project.new(files.photo, p=>{
        res.redirect(`/portfolio/${project._id}`);
      });
    });
  });
};
