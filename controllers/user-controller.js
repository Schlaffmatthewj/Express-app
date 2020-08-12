const bcrypt = require('bcryptjs');
const User = require('../models/User');

const userController = {
    index(req, res, next) {
        // MAKE THIS THE USER INDEX VIEW
        // WITH GLOBAL CITIES AVAILABLE
        res.json({
            message: 'ok',
            data: {
                user: req.user,
            },
        });
    },

    show(req, res, next) {
        // USER COLLECTION
        res.send('USER SHOW PAGE');
    },

    create(req, res, next) {
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
    },
    
    delete(req, res, next) {
        User.getById(req.params.id)
        .then(user => user.delete())
        .then(() => res.redirect('/'))
        .catch(next);
    },
};

module.exports = userController;