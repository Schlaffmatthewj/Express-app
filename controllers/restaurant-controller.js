const Restaurant = require('../models/Restaurant');

const restaurantController = {};

restaurantController.show = (req, res, next) => {
    res.render('restaurant/index', {
        message: 'ok',
        data: {
            id: res.locals.id,
            name: res.locals.name,
            restUrl: res.locals.restUrl,
            location: res.locals.location,
            cuisines: res.locals.cuisines,
            times: res.locals.timing,
            photo: res.locals.photo,
            photoAlbum: res.locals.photoAlbum,
            menu: res.locals.menu,
            phone: res.locals.phoneNum,
            user: req.user,
        },
    })
};

module.exports = restaurantController;