'use strict';

var users = global.nss.db.collection('users');
var bcrypt = require('bcrypt');
var Mongo = require('mongodb');

class User
{
  constructor(obj)
  {
    this.email = obj.email;
    this.password = obj.password;
  }

  login(fn=()=>{})
  {
    users.findOne({email:this.email}, (e, u)=>
    {
      if(u)
      {
        var isMatch = bcrypt.compareSync(this.password, u.password);
        if(isMatch)
        {
          fn(u);
        }
        else
        {
          fn(null);
        }
      }
      else
      {
        this.password = bcrypt.hashSync(this.password, 8);
        users.save(this, (e, u)=>fn(u));
      }
    });
  }

  static findByUserId(userId, fn)
  {
    userId = Mongo.ObjectID(userId);
    users.findOne({_id:userId}, (e, user)=>fn(user));
  }
}

module.exports = User;