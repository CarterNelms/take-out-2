'use strict';

var traceur = require('traceur');
var Dish = traceur.require(__dirname + '/../models/dish.js');
var User = traceur.require(__dirname + '/../models/user.js');
var Order = traceur.require(__dirname + '/../models/order.js');

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

exports.create = (req, res)=>
{
  Dish.getDishes(req.body.dishId, req.body.quantity, newDishes=>
  {
    var order = new Order(newDishes, req.session.userId);
    console.log(order);
    if(order.dishes.length)
    {
      order.save(()=>
      {
        console.log('SAVED');
        res.redirect('/orders/history');
      });
    }
    else
    {
      console.log('NOT SAVED');
      res.redirect('/orders/history');
    }
  });
};