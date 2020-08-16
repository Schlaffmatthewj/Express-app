const bcrypt = require('bcryptjs');

const User = require('../models/User');
const City = require('../models/City');

const userController = {};

userController.index = (req, res, next) => {
    City.getAllForUser(req.user.id)
    .then(cities => {
        res.render('user/index', {
            message: 'ok',
            data: {
                user: req.user,
                cities: cities,
                restaurants: res.locals.restaurants,
            },
        });
    })
    .catch(next)
};

userController.create = (req, res, next) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);
    new User({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password_digest: hash,
    })
    .save()
    .then(user => {
        req.login(user, (err) => {
            if (err) {
                res.render('errors/two_users', {
                    message: 'Error',
                    data: {
                        Error: err,
                        Error_message: err.message,
                    },
                });
            };
            res.redirect('/user');
        });
    })
    .catch(next);
};

userController.update = (req, res, next) => {
    req.user.update(req.body)
    .then(()=> res.redirect('/user'))
    .catch(next);
};


// THIS NEEDS TO CLEAR OUT THE JOIN TABLES ALSO
userController.delete = (req, res, next) => {
    req.user.delete()
    .then(() => {
        req.session.destroy();
        res.render('index');
    })
    .catch(next);
};

module.exports = userController;