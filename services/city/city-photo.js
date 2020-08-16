const fetch = require('node-fetch');
require('dotenv').config();

const getPhotoOfCity = (req, res, next) => {
    fetch(`https://api.pexels.com/v1/search?query=${res.locals.city_name}`, {
        headers: {
            Authorization: process.env.PEXELS_KEY,
        },
    })
    .then(fetchRes => fetchRes.json())
    .then(allPhotos => {
        // console.log(allPhotos);
        if (!allPhotos.photos.length) {
            res.locals.cityPicture = null;
        } else {
            const picture = allPhotos.photos[0].src.medium;
            res.locals.cityPhoto = picture;
        }
        next();
    })
    .catch(next);
};

module.exports = {
    getPhotoOfCity,
};