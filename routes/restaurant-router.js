const express = require('express');
const restaurantRouter = express.Router();

const restaurantController = require('../controllers/restaurant-controller');
const { openRestaurant } = require('../services/restaurants/restaurant-helpers');

restaurantRouter.post('/:id([0-9]+)', openRestaurant, restaurantController.create, restaurantController.show);
restaurantRouter.get('/:id([0-9]+)/', openRestaurant, restaurantController.show);

module.exports = restaurantRouter;