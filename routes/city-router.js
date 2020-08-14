const express = require('express');
const cityRouter = express.Router();

const cityController = require('../controllers/city-controller');
const { getCityCoords } = require('../services/city/city-coords-helpers');
const { unPackCity } = require('../services/city/city-helpers');

cityRouter.get('/:id([0-9]+)', cityController.find, unPackCity, cityController.show);
cityRouter.post('/', getCityCoords, cityController.create, unPackCity, cityController.show);

module.exports = cityRouter;