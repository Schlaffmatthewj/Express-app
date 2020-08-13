const bcrypt = require('bcryptjs');

const User = require('../models/User');


const userController = {};

userController.index = (req, res, next) => {
    // console.log('USER LOGGING IN', req.user);
    // SHOW ALL PERSONAL CITIES AND RESTAURANTS
    res.render('user/index', {
        message: 'ok',
        data: { user: req.user },
    })
};

userController.create = (req, res, next) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);
    new User({
        username: req.body.username,
        email: req.body.email,
        password_digest: hash,
    })
    .save()
    .then(user => {
        req.login(user, (err) => {
            if (err) return next(err);
            res.redirect('/user');
        });
    })
    .catch(next);
};

userController.update = (req, res, next) => {
    req.user.update(req.body)
    .then(()=> res.redirect(`/user`))
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