const fetch = require('node-fetch');
require('dotenv').config();

const openRestaurant = (res, req, next) => {
    fetch('https://developers.zomato.com/api/v2.1/geocode?lat=31.786612841213902&lon=-106.417381535639', {
        headers: {
            user_key: process.env.ZOMATO_KEY,
        },
    })
    .then(fetchRes => fetchRes.json())
    .then(jsonRes => {
        // console.log('JSON RESULTS', jsonRes);
        return jsonRes;
    })
    .then(digging => digging.popularity.top_cuisines)
    .then(dugUp => {
        console.log('WHAT DO WE HAVE TO WORK WITH', dugUp)
        next();
    })
    // .then(each => {
    //     console.log(each)
    // })
    .catch(err => {
        console.log(err);
        next(err);
    });
};

module.exports = {
    openRestaurant,
};