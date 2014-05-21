'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');

exports.new = (req, res)=>{
  res.render('users/new', {title: 'User Registration'});
};

exports.login = (req, res)=>{
  var user = new User(req.body);
  user.login((u)=>
  {
    if(u)
    {
      req.session.userId = u._id;
    }
    else
    {
      req.session.userId = null;
    }

    res.redirect('/orders');
  });
};