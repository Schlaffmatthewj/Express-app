const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/user-controller');
const user_citiesController = require('../controllers/user_cities-controller');
const cityController = require('../controllers/city-controller');
const authHelpers = require('../services/auth/auth-helpers');
const { getCityCoords } = require('../services/city/city-helpers');

// NEED TO ADD THE MIDDLE WEAR THAT FINDS CITIES AND RESTAURANTS
userRouter.get('/', authHelpers.loginRequired, userController.index);
userRouter.post('/', userController.create);
userRouter.get('/new', authHelpers.loginRedirect, (req, res) => res.render('auth/register'));

userRouter.put('/:id([0-9]+)', userController.update);
userRouter.get('/:id([0-9]+)/edit', (req, res) => {
    res.render('user/edit', {
        user: req.user,
    });
});
userRouter.delete('/:id([0-9]+)', userController.delete);
// THIS NEEDS TO CLEAR OUT THE JOIN TABLES ALSO

userRouter.post('/city', getCityCoords, cityController.create, user_citiesController.saveForUser, userController.index);
userRouter.get('/city/:id([0-9]+)', cityController.show);
// userRouter.delete('/city/:id', userController.deleteCity);

// userRouter.get('/restaurant', userController.restaurant);
// userRouter.get('/restaurant/:id([0-9]+)', userController.restaurantShow);
// userRouter.delete('/restaurant/:id', userController.deleteRestaurant);


module.exports = userRouter;