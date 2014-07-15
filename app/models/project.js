/* jshint unused:false */

'use strict';

var projects = global.nss.db.collection('projects');
var fs = require('fs');
var Mongo = require('mongodb');
var rimraf = require('rimraf');
var _ = require('lodash');
var counter = 1;


class Project{

  constructor(fields, files, userId){
    this._id = Mongo.ObjectID();
    this.title = fields.title[0].trim();
    this.description = fields.description[0].trim();
    this.git = fields.git[0].trim();
    this.app = fields.app[0].trim();
    this.date = new Date(fields.date[0]);
    this.tags = fields.tags[0].split(',').map(t=>t.toLowerCase()).map(t=>t.trim());
    this.userId = Mongo.ObjectID(userId);
    this.photos = [];
    this.order = counter++;
  }

  isOwner(user){
    return user._id.toString() === this.userId.toString();
  }

  update(obj, fn){
    this.title = obj.title.trim();
    this.description = obj.description.trim();
    this.git = obj.git.trim();
    this.app = obj.app.trim();
    this.date = new Date(obj.date);
    this.tags = obj.tags.map(t=>t.toLowerCase());

    projects.save(this, (e,p)=>fn(p));
  }

  new(pics, fn){
    pics.forEach(p=>{
      var fileName = p.originalFilename.toLowerCase().replace(/[^\w]/g, '');
      this.photos.push({path:`/img/${this.userId}/${this._id}/${fileName}`, isPrimary: false});
      var oldPath = p.path;
      var newPath = `${__dirname}/../static/img/${this.userId}/${this._id}/${fileName}`;
      var idDir = `${__dirname}/../static/img/${this.userId}`;
      var titleDir = `${__dirname}/../static/img/${this.userId}/${this._id}`;

      if(!fs.existsSync(idDir)){fs.mkdirSync(idDir);}
      if(!fs.existsSync(titleDir)){fs.mkdirSync(titleDir);}

      fs.renameSync(oldPath, newPath);
    });
      projects.save(this, (e, p)=>fn(p));
  }

  setPrimary(path, fn){
    this.photos.forEach((p, i)=>{
      if(p.path === path){
        this.photos[i].isPrimary = true;
      }else{
        this.photos[i].isPrimary = false;
      }
    });
    projects.save(this, (e,p)=>fn(p));
  }

  deletePic(img, fn){
    var newArray = this.photos.filter((p)=> p.path !== img);
    this.photos = newArray;
    var path = `${__dirname}/../static${img}`;
    fs.unlinkSync(path);
    // rimraf.sync(path);
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
