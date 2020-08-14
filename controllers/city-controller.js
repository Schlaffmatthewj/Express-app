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
        res.locals.long = city.longitude;
        res.locals.lat = city.latitude;
        next();
    })
    .catch(next);
    // .then(city => {
    //     // console.log(city)
    //     let obj = {
    //         longitude: city.longitude,
    //         latitude: city.latitude,
    //         city_id: city.id,
    //     }
    //     return obj;
    // })
    // .then(thing => {
    //     res.locals.thing = thing;
    //     next();
    // })
    // .catch(next);
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
        console.log('HELLOOOOOOO')
        next();
    })
    .catch(next);
};

module.exports = cityController;