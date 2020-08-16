const Restaurant = require('../models/Restaurant');

const restaurantController = {};

restaurantController.index = (req, res, next) => {
    Restaurant.getAllForUser(req.user.id)
    .then(rests => {
        res.locals.restaurants = rests;
        next();
    })
    .catch(next);
};

restaurantController.show = (req, res, next) => {
    // console.log('GOOD TEST SPOT', res.locals)
    res.render('restaurant/index', {
        message: 'ok',
        data: {
            id: res.locals.zomato_id,
            name: res.locals.name,
            restUrl: res.locals.restUrl,
            location: res.locals.location,
            cuisines: res.locals.cuisines,
            times: res.locals.timing,
            photo: res.locals.photo,
            photoAlbum: res.locals.photoAlbum,
            menu: res.locals.menu,
            phone: res.locals.phoneNum,
            zomato_city_id: res.locals.location.city_id,
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
        res.locals.zomato_id = rest.zomato_id;
        res.locals.zomato_city_id = rest.zomato_city_id;
        res.locals.city_id = rest.city_id;
        next();
    })
    .catch(next);
};

restaurantController.create = (req, res, next) => {
    // console.log('RIGHT HERE', res.locals)
    new Restaurant({
        name: res.locals.name,
        zomato_city_id: res.locals.location.city_id,
        zomato_id: res.locals.zomato_id,
        city_id: res.locals.city_id,
    })
    .save()
    .then(savedRest => {
        // console.log('ANOTHER TEST', savedRest)
        res.locals.zomato_id = savedRest.zomato_id;
        res.locals.zomato_city_id = savedRest.zomato_city_id;
        res.locals.city_id = savedRest.city_id;
        next();
    })
    .catch(() => res.render('errors/two_restaurants'));
};

module.exports = restaurantController;