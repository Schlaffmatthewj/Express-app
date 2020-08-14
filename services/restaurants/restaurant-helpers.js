const fetch = require('node-fetch');
const restaurantController = require('../../controllers/restaurant-controller');
require('dotenv').config();

const openRestaurant = (req, res, next) => {
    console.log('PARAMS', req.params.id)
    fetch(`https://developers.zomato.com/api/v2.1/restaurant?res_id=${req.params.id}
    `, {
        headers: {
            user_key: process.env.ZOMATO_KEY,
        },
    })
    .then(fetchRes => fetchRes.json())
    .then(jsonRes => {
        res.locals.id = jsonRes.id;
        res.locals.name = jsonRes.name;
        res.locals.restUrl = jsonRes.url;
        res.locals.location = {
            address: jsonRes.location.address,
            locality: jsonRes.location.locality,
            city: jsonRes.location.city,
            zip: jsonRes.location.zipcode,
        };
        res.locals.cuisines = jsonRes.cuisines;
        res.locals.timing = jsonRes.timings;
        if (!jsonRes.featured_image) {
            res.locals.photo = null;
        } else {
            res.locals.photo = jsonRes.featured_image;
        };
        res.locals.photoAlbum = jsonRes.photos_url;
        res.locals.menu = jsonRes.menu_url;
        res.locals.phoneNum = jsonRes.phone_numbers;
        // MAY GET TO USER RATINGS ?????  /////
        next();
    })
    .catch(err => {
        console.log(err);
        next(err);
    });
}

module.exports = openRestaurant;