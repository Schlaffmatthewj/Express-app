// NEED POST ROUTES INSIDE OF THE SEARCH ROUTER, FOR CITY AND RESTAURANT
const express = require('express');
const searchRouter = express.Router();

searchRouter.get('/', (req, res) => res.render('search/index'));

module.exports = searchRouter;
