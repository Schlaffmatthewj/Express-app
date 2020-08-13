const User_cities = require('../models/User_cities');
const City = require('../models/City');


const user_citiesController = {};

user_citiesController.user = (req, res, next) => {
    // User_cities.getAllByUser_id(req.user.id)
    // .then(allCities => {
    //     console.log('FIND FIND', allCities);
    //     res.render('user/index', {
    //         message: 'ok',
    //         data: {
    //             cities: allCities,
    //             user: req.user,
    //         },
    //     });
    // })
    // .catch(next);
};

user_citiesController.saveForUser = (req, res, next) => {
    // console.log('FINDING THIS IS KEY', req.user.id)
    // new User_cities({
    //     user_id: req.user.id,
    //     city_id: res.locals.city_id,
    // })
    // .save();
    // User_cities.getAllByUser_id(req.user.id)
    // .then(allCities => allCities.map(city => new City(city)))
    // .then(city => {
    //     console.log('PLEASE BE THIS', city)
    //     return res.locals.city_name = city.name;
    // })
    // .catch(next);
}

module.exports = user_citiesController;