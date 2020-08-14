const express = require('express');
const restaurantRouter = express.Router();

const restaurantController = require('../controllers/restaurant-controller');


// restaurantRouter.get('/fetch', openRestaurant, (req, res) => {
//     res.render('restaurant/index', {
//         message: 'ok',
//         data: {},
//     })
// })

module.exports = restaurantRouter;