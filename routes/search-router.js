// NEED POST ROUTES INSIDE OF THE SEARCH ROUTER, FOR CITY AND RESTAURANT
const express = require('express');
const searchRouter = express.Router();

searchRouter.get('/', (req, res) => res.render('search/index')); //ADD MIDDLEWARE TO GET DATA FROM HELPERS
searchRouter.get('/new', (req, res) => res.render('search/new'));

module.exports = searchRouter;
