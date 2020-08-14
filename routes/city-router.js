const express = require('express');
const cityRouter = express.Router();

const cityController = require('../controllers/city-controller');
const restaurantController = require('../controllers/restaurant-controller');
const { getCityCoords } = require('../services/city/city-helpers');
const { openRestaurant } = require('../services/restaurants/restaurants-helpers');

cityRouter.get('/:id([0-9]+)', cityController.find, openRestaurant, cityController.page);
cityRouter.post('/', getCityCoords, cityController.create, cityController.show);

module.exports = cityRouter;