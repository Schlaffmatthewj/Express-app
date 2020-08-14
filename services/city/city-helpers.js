const fetch = require('node-fetch');
require('dotenv').config();

const unPackCity = (req, res, next) => {
    fetch(`https://developers.zomato.com/api/v2.1/geocode?lat=${res.locals.latitude}&lon=${res.locals.longitude}`, {
        headers: {
            user_key: process.env.ZOMATO_KEY,
        },
    })
    .then(fetchRes => fetchRes.json())
    .then(jsonRes => {
        res.locals.city_name = jsonRes.location.city_name;
        res.locals.top_cuisines = jsonRes.popularity.top_cuisines;
        res.locals.link = jsonRes.link;
        res.locals.nearBy = jsonRes.nearby_restaurants;
        res.locals.id = res.locals.id;
        res.locals.user = res.locals.user;
        next();
    })
    .catch(err => {
        console.log(err);
        next(err);
    });
};

module.exports = {
    unPackCity,
};