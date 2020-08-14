const Restaurant = require('../models/Restaurant');

const restaurantController = {};

restaurantController.index = (req, res, next) => {
    res.render('restaurant/index', {
        message: 'ok',
        data: {
            city_name: res.locals.city_name,
            city_cuisine: res.locals.top_cuisines,
            city_link: res.locals.link,
            city_nearby: res.locals.nearBy,
        },
    });
};

module.exports = restaurantController;