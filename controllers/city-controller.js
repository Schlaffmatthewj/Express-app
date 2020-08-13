const City = require('../models/City');

const cityController = {};

cityController.index = (req, res, next) => {
    City.getAll()
    .then(cities => {
        next(cities);
    })
    .catch(next);
};

cityController.show = (req, res, next) => {
    City.getById(req.params.id)
    .then(city => {
        next(city);
    })
    .catch(next);
};

cityController.create = (req, res, next) => {
    new City({
        // this will be from the fetch
        name: req.body.name,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
    })
    .save()
    .then(() => res.redirect('/search'))
    .catch(next);
};

cityController.delete = (req, res, next) => {
    // THIS WILL ONLY DELETE THE USERS RELATIONSHIP
};

module.exports = cityController;