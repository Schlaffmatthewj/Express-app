const express = require('express');
const cityRouter = express.Router();

const cityController = require('../controllers/city-controller');
const { getCityCoords } = require('../services/city/city-helpers');

cityRouter.get('/:id([0-9]+)', cityController.show, (req, res) => {

})
cityRouter.post('/', getCityCoords, cityController.create, cityController.show)

module.exports = cityRouter;