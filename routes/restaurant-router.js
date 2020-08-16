const express = require('express');
const restaurantRouter = express.Router();

const restaurantController = require('../controllers/restaurant-controller');
const { openRestaurant } = require('../services/restaurants/restaurant-helpers');

restaurantRouter.get('/:id([0-9]+)', openRestaurant, restaurantController.show);
restaurantRouter.post('/:id([0-9]+)', openRestaurant, restaurantController.create, restaurantController.show);

module.exports = restaurantRouter;