'use strict';

var traceur = require('traceur');
var Dish = traceur.require(__dirname + '/../models/dish.js');
var User = traceur.require(__dirname + '/../models/user.js');

exports.new = (req, res)=>
{
  User.findByUserId(req.session.userId, user=>
  {
    if(user)
    {
      Dish.menu(menus=>
      {
        res.render('orders/new', {menus: menus, user: user, title: 'Order Food'});
      });
    }
    else
    {
      res.redirect('/login');
    }
  });
};

exports.row = (req, res)=>
{
  Dish.menu(menus=>
  {
    res.render('orders/row', {menus: menus});
  });
};