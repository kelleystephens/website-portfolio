/* jshint unused:false */

'use strict';

var projects = global.nss.db.collection('projects');
var fs = require('fs');
var Mongo = require('mongodb');
var rimraf = require('rimraf');
var _ = require('lodash');


class Project{

  static create(obj, userId, fn){
    var project = new Project();
    project.title = obj.title;
    project.description = obj.description;
    project.git = obj.git;
    project.app = obj.app;
    project.userId = Mongo.ObjectID(userId);
    projects.save(project, ()=>fn());
  }

  isOwner(user){
    return user._id.toString() === this.userId.toString();
  }

  update(obj, fn){
    this.title = obj.title;
    this.description = obj.description;
    this.git = obj.git;
    this.app = obj.app;

    projects.save(this, (e,p)=>fn(p));
  }

  static findAll(fn){
    projects.find().toArray((e, r)=>fn(r));
  }

  static findById(pId, fn){
    pId = Mongo.ObjectID(pId);
    projects.findOne({_id:pId}, (e,p)=>{
      p = _.create(Project.prototype, p);
      fn(p);
    });
  }

  static findAndRemove(pId, fn){
    pId = Mongo.ObjectID(pId);
    projects.findAndRemove({_id:pId}, (e,p)=>{
      fn();
    });
  }
}

module.exports = Project;
