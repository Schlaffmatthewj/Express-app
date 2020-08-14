const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/user-controller');
const user_citiesController = require('../controllers/user_cities-controller');
const user_restaurantsController = require('../controllers/user_restaurants-controller');
const cityController = require('../controllers/city-controller');
const restaurantController = require('../controllers/restaurant-controller');
const { loginRedirect, loginRequired } = require('../services/auth/auth-helpers');

// NEED TO ADD THE MIDDLE WEAR THAT FINDS CITIES AND RESTAURANTS
userRouter.get('/', loginRequired, userController.index);
userRouter.post('/', userController.create);
userRouter.get('/new', loginRedirect, (req, res) => res.render('auth/register'));

userRouter.put('/:id([0-9]+)', userController.update);
userRouter.get('/:id([0-9]+)/edit', (req, res) => {
    res.render('user/edit', {
        user: req.user,
    });
});
userRouter.delete('/:id([0-9]+)', userController.delete);
// THIS NEEDS TO CLEAR OUT THE JOIN TABLES ALSO

userRouter.post('/city/:id([0-9]+)', loginRequired, user_citiesController.saveForUser);
userRouter.delete('/city/:id([0-9]+)', cityController.find, user_citiesController.removeForUser);

userRouter.post('/restaurant/:id([0-9]+)', loginRequired, user_restaurantsController.saveForUser);
userRouter.delete('/restaurant/:id([0-9]+)', restaurantController.find, user_restaurantsController.removeForUser);

module.exports = userRouter;