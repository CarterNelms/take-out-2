'use strict';

var traceur = require('traceur');
var Dish = traceur.require(__dirname + '/../models/dish.js');

exports.menu = (req, res)=>
{
  Dish.findAllByMenu(req.params.menu, dishes=>
  {
    res.render('dishes/menu', {dishes: dishes});
  });
};