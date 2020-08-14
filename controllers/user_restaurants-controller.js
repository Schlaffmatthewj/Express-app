const User_restaurants = require('../models/User_restaurants');

const user_restaurantsController = {};

user_restaurantsController.saveForUser = (req, res, next) => {
    new User_restaurants({
        user_id: req.user.id,
        restaurant_id: req.params.id,
    })
    .save()
    .then(() => res.redirect('/user'))
    .catch(next);
};

user_restaurantsController.removeForUser = (req, res, next) => {
    User_restaurants.getOneForUser(req.user.id, res.locals.restaurant_id)
    .then(rest => rest.delete())
    .then(() => res.redirect('/user'))
    .catch(next);
};

module.exports = user_restaurantsController;