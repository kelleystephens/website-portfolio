/* jshint unused:false */

'use strict';

var projects = global.nss.db.collection('projects');
var fs = require('fs');


class Project{
  constructor(fields, files, userId){
    this.title = fields.title[0];
    this.description = fields.description[0];
    this.git = fields.git[0];
    this.app = fields.app[0];
    this.date = new Date(fields.date[0]);
    this.tags = fields.tags;
    this.userId = userId;
    this.photos = [];
  }

  new(pics, fn){
    pics.forEach(p=>{
      this.photos.push(`/img/${this.userId}/${this.title}/${p.originalFilename}`);
      var oldPath = p.path;
      var newPath = `app/static/img/${this.userId}/${this.title}/${p.originalFilename}`;
      var idDir = `app/static/img/${this.userId}`;
      var titleDir = `app/static/img/${this.userId}/${this.title}`;
      if(!fs.existsSync(idDir)){fs.mkdirSync(idDir);}
      if(!fs.existsSync(titleDir)){fs.mkdirSync(titleDir);}
      fs.renameSync(oldPath, newPath);
    });
      projects.save(this, (e, p)=>fn(p));
  }
}

module.exports = Project;
