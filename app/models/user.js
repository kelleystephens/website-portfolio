var users = global.nss.db.collection('users');
var bcrypt = require('bcrypt');
var Mongo = require('mongodb');
var request = require('request');

class User{

  static login(obj, fn){
    users.findOne({email:obj.email}, (e,u)=>{
      if(u){
        var isMatch = bcrypt.compareSync(obj.password, u.password);
        if(isMatch){
          fn(u);
        }else{
          fn(null);
        }
      }else{
          fn(null);
      }
    });
  }

  static findByUserId(userId, fn){
    userId = Mongo.ObjectID(userId);
    users.findOne({_id:userId}, (e,u)=>fn(u));
  }

  static sendContactRequest(obj, fn){
    var name = obj.name;
    var email = obj.email;
    var message = obj.msg;
    sendEmail(name, email, message, fn);
  }
}

function sendEmail(name, email, message, fn){
  'use strict';
  var key = process.env.MAILGUN;
  var url = 'https://api:' + key + '@api.mailgun.net/v2/sandboxa0a2c1ef773f44dcbaf274d605ea4eef.mailgun.org/messages'; //sandbox... is my subdomain they gave me, if add my website, then it would go there
  var post = request.post(url, function(err, response, body){
    fn(name);
  });

  var form = post.form();
  form.append('from', 'contact@kelleystephens.com');
  form.append('to', 'kelley.stephens@outlook.com');
  form.append('subject', `Contact Request from ${name}`);
  form.append('html', `<b>Name:</b> ${name}<br> <b>Email:</b> ${email}<br> <b>Message:</b> ${message}`);
}

module.exports = User;
