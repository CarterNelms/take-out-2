'use strict';

var _ = require('lodash');
var dishes = global.nss.db.collection('dishes');
var Mongo = require('mongodb');

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

  static getDishes(dishIds, quantities, fn)
  {
    var newDishes = [];

    dishIds = makeArray(dishIds);
    quantities = makeArray(quantities);

    mergeDuplicateOrders();

    var dishCount = dishIds.length;
    dishIds.forEach((dishId, i)=>
    {
      if(quantities[i]*1 > 0)
      {
        dishId = Mongo.ObjectID(dishId);
        dishes.findOne({_id: dishId}, (e, dish)=>
        {
          var dishData = {
            quantity: quantities[i],
            dishId: dishId,
            cost: dish.cost,
            calories: dish.calories
          };
          newDishes.push(dishData);

          if(newDishes.length >= dishCount)
          {
            mergeDuplicateDishes(newDishes);
            fn(newDishes);
          }
        });
      }
    });

    function mergeDuplicateOrders()
    {
      var uniqueIds = _(dishIds).map(dishId=>String(dishId)).unique();
      if(uniqueIds.length < dishIds.length)
      {
        var qAndIds = dishIds.map((dishId, i)=>
        {
          return {
            dishId: String(dishId),
            quantity: quantities[i]
          };
        }
        uniqueIds.forEach(uniqueId=>
        {
          uniqueQuantities.push(qAndIds.filter(obj=>obj.id === uniqueId).map(obj=>obj.quantity).reduce((prev, curr)=>prev+curr));
        });
      }
    }

    // function mergeDuplicateDishes(dishes)
    // {
    //   var newDishes = [];
    //   var uniqueDishIds = _(dishes).map(dish=>String(dish.dishId)).unique().value();
    //   if(uniqueDishIds.length < dishes.length)
    //   {
    //     uniqueDishIds.forEach(dishId=>
    //     {
    //       var matchingDishes = dishes.filter(dish=>String(dish.dishId) === dishId);
    //       var currentDish = matchingDishes[0];

    //       if(matchingDishes.length > 1)
    //       {
    //         var quantity = 0;
    //         matchingDishes.forEach(dish=>quantity+=dish.quantity*1);
    //         currentDish.quantity = quantity;
    //       }

    //       newDishes.push(currentDish);
    //     });
    //   }
    // }

    function makeArray(item)
    {
      if(!Array.isArray(item))
      {
        return [item];
      }
      return item;
    }
  }
}

module.exports = Dish;