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
    console.log('CITY CONTROLS', res.locals)
    res.render('city/index', {
        message: 'ok',
        data: {
            city_name: res.locals.city_name,
            city_cuisine: res.locals.top_cuisines,
            city_link: res.locals.link,
            city_id: res.locals.id,
            nearby_restaurants: res.locals.nearBy,
            user: res.locals.user,
        },
    });
};

cityController.find = (req, res, next) => {
    // console.log('USER', req.user)
    City.getById(req.params.id)
    .then(city => {
        res.locals.longitude = city.longitude;
        res.locals.latitude = city.latitude;
        res.locals.id = city.id;
        res.locals.user = req.user;
        next();
    })
    .catch(next);
}

cityController.create = (req, res, next) => {
    new City({
        name: req.body.name,
        longitude: res.locals.longitude,
        latitude: res.locals.latitude,
    })
    .save()
    .then((savedCity) => {
        res.locals.city_id = savedCity.id;
        next();
    })
    .catch(next);
};

module.exports = cityController;