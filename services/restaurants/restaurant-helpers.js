const fetch = require('node-fetch');
require('dotenv').config();

const openRestaurant = (req, res, next) => {
    fetch(`https://developers.zomato.com/api/v2.1/restaurant?res_id=${req.params.id}
    `, {
        headers: {
            user_key: process.env.ZOMATO_KEY,
        },
    })
    .then(fetchRes => fetchRes.json())
    .then(jsonRes => {
        // console.log('IS IT AT LEAST RIGHT HERE', req.params);
        res.locals.zomato_id = parseInt(jsonRes.id);
        res.locals.name = jsonRes.name;
        res.locals.restUrl = jsonRes.url;
        res.locals.location = {
            address: jsonRes.location.address,
            locality: jsonRes.location.locality,
            city: jsonRes.location.city,
            city_id: jsonRes.location.city_id,
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
        next();
    })
    .catch(err => {
        console.log(err);
        next(err);
    });
}

module.exports = {
    openRestaurant,
}