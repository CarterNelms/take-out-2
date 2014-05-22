'use strict';

var orders = global.nss.db.collection('orders');
var Mongo = require('mongodb');

class Order
{
  constructor(dishes, userId)
  {
    this.dishes = dishes;
    this.userId = Mongo.ObjectID(userId);
    this.date = new Date();
  }

  get totalCost()
  {
    return totalVal(this.dishes, 'cost');
  }

  get totalCalories()
  {
    return totalVal(this.dishes, 'calories');
  }

  save(fn)
  {
    orders.save(this, ()=>
    {
      fn();
    });
  }

  static getAllByUserId(userId, fn)
  {
    userId = Mongo.ObjectID(userId);
    orders.find({userId: userId}).toArray((e, aOrders)=>
    {
      fn(aOrders);
    });
  }
}

function totalVal(dishes, property)
{
  var total = 0;
  dishes.forEach(dish=>
  {
    total += dish[property] * dish.quantity;
  });
  return total;
}

module.exports = Order;