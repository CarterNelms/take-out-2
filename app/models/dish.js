'use strict';

var _ = require('lodash');
var dishes = global.nss.db.collection('dishes');

class Dish
{
  static findAll(fn)
  {
    dishes.find().toArray((e, d)=>
    {
      fn(d);
    });
  }

  static menu(fn)
  {
    Dish.findAll(dishes=>
    {
      var menu = _(dishes).map(d=>d.menu).unique().value();
      fn(menu);
    });
  }

  static findAllByMenu(menu, fn)
  {
    dishes.find({menu: menu}).toArray((e, d)=>
    {
      fn(d);
    });
  }
}

module.exports = Dish;