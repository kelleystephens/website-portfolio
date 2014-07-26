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
  Project.create(req.body, req.session.userId, ()=>{
    res.redirect('/portfolio');
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
  console.log('*****here****');
  Project.findById(req.params.id, project=>{
    console.log('*****project****');
    console.log(project);
    project.update(req.body, p=>{
      console.log('*****route****');
      console.log(p);
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
