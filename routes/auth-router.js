const express = require('express');
const authRouter = express.Router();

const authHelpers = require('../services/auth/auth-helpers');
const passport = require('../services/auth/local');

authRouter.get('/login', authHelpers.loginRedirect, (req, res) => res.render('auth/login'));

authRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/auth/login',
    failureFlash: false,
}));

authRouter.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// authRouter.get('/failure', (req, res) => {
//     res.render('errors/login', {
//         message: 'Error',
//         data: {
//             Error: err,
//             Error_message: err.message,
//         },
//     });
// });

module.exports = authRouter;