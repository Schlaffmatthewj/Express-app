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
    console.log()
    City.getById()
    .then(city => {
        res.render('city/index', {
            message: 'ok',
            data: { city },
        });
    })
    .catch(next);
};

cityController.create = (req, res, next) => {
    new City({
        // this will be from the fetch
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

cityController.delete = (req, res, next) => {
    // THIS WILL ONLY DELETE THE USERS RELATIONSHIP
};

module.exports = cityController;