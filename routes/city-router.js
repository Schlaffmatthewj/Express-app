const express = require('express');
const cityRouter = express.Router();

const cityController = require('../controllers/city-controller');
const { getCityCoords } = require('../services/city/city-coords-helpers');
const { unPackCity } = require('../services/city/city-helpers');
const { getPhotoOfCity } = require('../services/city/city-photo');

cityRouter.get('/:id([0-9]+)', cityController.find, unPackCity, getPhotoOfCity, cityController.show);
cityRouter.post('/', getCityCoords, cityController.create, unPackCity, cityController.show);

module.exports = cityRouter;