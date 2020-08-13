const User_cities = require('../models/User_cities');
// const userController = require('./user-controller');

const user_citiesController = {};

user_citiesController.user = (req, res, next) => {
    User_cities.getAllByUser_id(req.user.id)
    .then(allCities => {
        res.locals.allCities = allCities,
        next();
    })
    .catch(next);
};

user_citiesController.saveForUser = (req, res, next) => {
    console.log('FINDING THIS IS KEY', req.user.id)
    new User_cities({
        user_id: req.user.id,
        city_id: res.locals.city_id,
    })
    .save();
    User_cities.getAllByUser_id(req.user.id)
    .then(allCities => {
        res.locals.allCities = allCities,
        next();
    })
    .catch(next);
}

module.exports = user_citiesController;