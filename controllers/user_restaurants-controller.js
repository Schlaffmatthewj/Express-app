const User_restaurants = require('../models/User_restaurants');

const user_restaurantsController = {};

user_restaurantsController.saveForUser = (req, res, next) => {
    console.log('GOAL LINE', res.locals.zomato_city_id);
    new User_restaurants({
        user_id: req.user.id,
        restaurant_id: res.locals.zomato_id,
    })
    .save()
    .then(() => res.redirect('/user'))
    .catch(next);
};

user_restaurantsController.removeForUser = (req, res, next) => {
    console.log('OVER HERE', res.locals.restaurant_id)
    User_restaurants.getOneForUser(req.user.id, res.locals.zomato_city_id)
    .then(rest => rest.delete())
    .then(() => res.redirect('/user'))
    .catch(next);
};

module.exports = user_restaurantsController;