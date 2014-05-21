'use strict';

var orders = global.nss.db.collection('orders');
// var bcrypt = require('bcrypt');

class Order
{
  constructor(dishes, userId)
  {
    this.dishes = dishes;
    this.userId = userId;
    this.date = new Date();
  }

  get totalCost()
  {
    var total = 0;
    this.dishes.forEach(dish=>
    {
      total += dish.cost;
    });
    return total;
  }

  get totalCalories()
  {
    var total = 0;
    this.dishes.forEach(dish=>
    {
      total += dish.calories;
    });
    return total;
  }

  save(fn)
  {
    orders.save(this, ()=>
    {
      fn();
    });
  }
}

module.exports = Order;