const express = require('express');
const cityRouter = express.Router();

const cityController = require('../controllers/city-controller');
const { getCityCoords } = require('../services/city/city-coords-helpers');
const { openRestaurant } = require('../services/city/city-helpers');

cityRouter.get('/:id([0-9]+)', cityController.find, openRestaurant, cityController.show);
cityRouter.post('/', getCityCoords, cityController.create, openRestaurant, cityController.show);

module.exports = cityRouter;