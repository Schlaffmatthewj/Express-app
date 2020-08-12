const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/user-controller');
const authHelpers = require('../services/auth/auth-helpers');

userRouter.get('/', authHelpers.loginRequired, userController.index);
userRouter.post('/', userController.create);
userRouter.get('/new', authHelpers.loginRedirect, (req, res) => {
    res.render('auth/register');
});

// userRouter.get('/:id([0-9]+)', userController.show);
// userRouter.delete('/:id', userController.delete);

// userRouter.get('/city', userController.city);
// userRouter.get('/city/:id([0-9]+)', userController.cityShow);
// userRouter.delete('/city/:id', userController.deleteCity);

// userRouter.get('/restaurant', userController.restaurant);
// userRouter.get('/restaurant/:id([0-9]+)', userController.restaurantShow);
// userRouter.delete('/restaurant/:id', userController.deleteRestaurant);


module.exports = userRouter;