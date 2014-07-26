/* jshint unused:false */

'use strict';

var projects = global.nss.db.collection('projects');
var fs = require('fs');
var Mongo = require('mongodb');
var rimraf = require('rimraf');
var _ = require('lodash');
var counter = 1;


class Project{

  static create(obj, userId, fn){
    var project = new Project();
    project.title = obj.title[0].trim();
    project.description = obj.description[0].trim();
    project.git = obj.git[0].trim();
    project.app = obj.app[0].trim();
    project.userId = Mongo.ObjectID(userId);
    project.order = counter++;
    projects.save(project, ()=>fn());
  }

  isOwner(user){
    return user._id.toString() === this.userId.toString();
  }

  update(obj, fn){
    console.log('*****model****');
    console.log(obj);
    this.title = obj.title.trim();
    this.description = obj.description.trim();
    this.git = obj.git.trim();
    this.app = obj.app.trim();

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
      var path = `${__dirname}/../static/img/${p.userId}/${this._id}`;
      if(path){
        rimraf(path, fn);
      }else{
        fn();
      }
    });
  }
}

module.exports = Project;
