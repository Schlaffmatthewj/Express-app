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
    City.getById(res.locals.city_id || req.params.id)
    .then(city => {
        res.render('city/index', {
            message: 'ok',
            data: { city },
        });
    })
    .catch(next);
};

cityController.find = (req, res, next) => {
    City.getById(req.params.id)
    .then(city => {
        res.locals.city_id = city.id;
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