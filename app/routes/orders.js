'use strict';

var traceur = require('traceur');
var Dish = traceur.require(__dirname + '/../models/dish.js');
var User = traceur.require(__dirname + '/../models/user.js');
var Order = traceur.require(__dirname + '/../models/order.js');
var _ = require('lodash');

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
    if(order.dishes.length)
    {
      order.save(()=>
      {
        res.redirect('/orders/history');
      });
    }
    else
    {
      res.redirect('/orders/history');
    }
  });
};

exports.history = (req, res)=>
{
  Order.getAllByUserId(req.session.userId, orders=>
  {
    var dishIds = [];
    makeArray(orders).forEach(order=>
    {
      dishIds = dishIds.concat(order.dishes.map(dish=>String(dish.dishId)));
    });
    dishIds = _(dishIds).unique().value();

    var dishCount = dishIds.length;
    var dishes = [];

    makeArray(dishIds).forEach((dishId, i)=>
    {
      Dish.getByDishId(dishId, dish=>
      {
        dishes.push(dish);
        if(!(--dishCount))
        {
          res.render('orders/history', {orders: orders, dishes: dishes, title: 'Order History'});
        }
      });
    });

    function makeArray(item)
    {
      if(!Array.isArray(item))
      {
        return [item];
      }
      return item;
    }
  });
};