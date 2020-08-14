const express = require('express');
const restaurantRouter = express.Router();

const restaurantController = require('../controllers/restaurant-controller');
const { openRestaurant } = require('../services/restaurants/restaurants-helpers');

restaurantRouter.get('/fetch', openRestaurant, (req, res) => {
    res.render('restaurant/index', {
        message: 'ok',
        data: {},
    })
})

module.exports = restaurantRouter;