const bcrypt = require('bcryptjs');

const User = require('../models/User');
const { response } = require('express');

const userController = {
    index(req, res, next) {
        console.log('THIS IS MY ANSWER', req.user);
        User.getById(req.user.id)
        .then(user => {
            res.render('user/index', {
                message: 'ok',
                data: { user },
            });
        })
        .catch(next);
    },

    show(req, res, next) {
        res.render('user/index', {
            message: 'ok',
            data: { user: req.user },
        });
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
                res.render('user/index')
            });
        })
        .catch(next);
    },

    // make a form to confirm WHO to get the username 
    update(req, res, next) {
        // console.log(req.params.id);
        // console.log(req.body);
        User.getById(req.params.id)
        .then(user => user.update(req.body))
        .then(updatedUser => res.redirect(`/user/${updatedUser.id}`))
        .catch(next);
    },
    
    delete(req, res, next) {
        User.findByUsername(req.params.username)
        .then(user => user.delete())
        .then(() => res.redirect('/'))
        .catch(next);
    },
};

module.exports = userController;