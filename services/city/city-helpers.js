const fetch = require('node-fetch');
require('dotenv').config();

const getCityCoords = (req, res, next) => {
    console.log('REQ', req.body.name);
    fetch(`https://developers.zomato.com/api/v2.1/locations?query=${req.body.name}`, {
        headers: {
            user_key: process.env.ZOMATO_KEY,
        },
    })
    .then(fetchRes => fetchRes.json())
    .then(jsonRes => jsonRes.location_suggestions)
    .then(locationRes => {
        res.locals.longitude = parseFloat(locationRes.map(lo => lo.longitude));
        res.locals.latitude = parseFloat(locationRes.map(la => la.latitude));

        console.log(res.locals)
        next();
    })
    .catch(err => {
        console.log(err);
        next(err);
    });
};

module.exports = {
    getCityCoords,
};