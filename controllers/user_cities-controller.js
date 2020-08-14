const User_cities = require('../models/User_cities');

const user_citiesController = {};

user_citiesController.saveForUser = (req, res, next) => {
    new User_cities({
        user_id: req.user.id,
        city_id: req.params.id,
    })
    .save()
    .then(() => res.redirect('/user'))
    .catch(next);
};

user_citiesController.removeForUser = (req, res, next) => {
    console.log('LOCALS', res.locals)
    User_cities.getOneForUser(req.user.id, res.locals.id)
    .then(city => city.delete())
    .then(() => res.redirect('/user'))
    .catch(next);
};

module.exports = user_citiesController;