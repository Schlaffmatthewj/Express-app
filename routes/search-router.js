// NEED POST ROUTES INSIDE OF THE SEARCH ROUTER, FOR CITY AND RESTAURANT
const express = require('express');
const searchRouter = express.Router();

const cityController = require('../controllers/city-controller');

searchRouter.get('/', cityController.index, (req, res) => {
    res.render('search/index', {
        message: 'ok',
        data: { cities: res.locals.globalCities }
    });
});
searchRouter.get('/new', (req, res) => res.render('search/new'));

module.exports = searchRouter;
