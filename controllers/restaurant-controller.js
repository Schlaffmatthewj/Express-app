const Restaurant = require('../models/Restaurant');

const restaurantController = {};

restaurantController.show = (req, res, next) => {
    console.log('GOOD TEST SPOT', res.locals.city_id)
    res.render('restaurant/index', {
        message: 'ok',
        data: {
            id: res.locals.id,
            name: res.locals.name,
            restUrl: res.locals.restUrl,
            location: res.locals.location,
            cuisines: res.locals.cuisines,
            times: res.locals.timing,
            photo: res.locals.photo,
            photoAlbum: res.locals.photoAlbum,
            menu: res.locals.menu,
            phone: res.locals.phoneNum,
            city_id: res.locals.city_id,
            user: req.user,
        },
    })
};

restaurantController.find = (req, res, next) => {
    Restaurant.getById(req.params.id)
    .then(rest => {
        res.locals.name = rest.name;
        res.locals.restaurant_id = rest.id;
        res.locals.zomato_id = res.zomato_id;
        next();
    })
    .catch(next);
};

restaurantController.create = (req, res, next) => {
    new Restaurant({
        name: req.body.name,
        city_id: res.locals.city_id,
        zomato_id: res.locals.zomato_id,
    })
    .save()
    .then(savedRest => {
        console.log('ANOTHER TEST', savedRest)
        res.locals.rest_id = savedRest.id;
        res.locals.city_id = savedRest.city_id;
        next();
    })
    .catch(next);
};

module.exports = restaurantController;