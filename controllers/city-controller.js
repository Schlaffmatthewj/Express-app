const City = require('../models/City');

const cityController = {};

cityController.index = (req, res, next) => {
    City.getAll()
    .then(cities => {
        res.locals.globalCities = cities;
        next();
    })
    .catch(next);
};

cityController.show = (req, res, next) => {
    // console.log('CITY CONTROLS', res.locals)
    res.render('city/index', {
        message: 'ok',
        data: {
            city_name: res.locals.city_name,
            city_cuisine: res.locals.top_cuisines,
            city_link: res.locals.link,
            city_id: res.locals.id,
            locality: res.locals.locality,
            zomato_city_id: res.locals.zomato_city_id,
            nearby_restaurants: res.locals.nearBy,
            user: res.locals.user,
        },
    });
};

cityController.find = (req, res, next) => {
    // console.log('USER', req.user)
    City.getById(req.params.id)
    .then(city => {
        res.locals.zomato_id = city.zomato_id;
        res.locals.longitude = city.longitude;
        res.locals.latitude = city.latitude;
        res.locals.id = city.id;
        res.locals.user = req.user;
        next();
    })
    .catch(next);
}

cityController.findByZomato = (req, res, next) => {
    City.getByZomato(res.locals.location.city_id)
    .then(city => {
        res.locals.zomato_city_id = city.zomato_id;
        res.locals.longitude = city.longitude;
        res.locals.latitude = city.latitude;
        res.locals.city_id = city.id;
        res.locals.user = req.user;
        next();
    })
    .catch(next);
}

cityController.create = (req, res, next) => {
    new City({
        name: req.body.name,
        zomato_id: res.locals.zomato_id,
        longitude: res.locals.longitude,
        latitude: res.locals.latitude,
    })
    .save()
    .then((savedCity) => {
        res.locals.zomato_id = savedCity.zomato_id;
        res.locals.city_id = savedCity.id;
        next();
    })
    .catch(err => {
        res.render('errors/two_cities', {
            message: 'Error',
            data: {
                Error: err,
                Error_message: err.message
            },
        })
    });
};

module.exports = cityController;