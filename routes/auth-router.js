const express = require('express');
const authRouter = express.Router();

const authHelpers = require('../services/auth/auth-helpers');
const passport = require('../services/auth/local');

authRouter.get('/login', authHelpers.loginRedirect, (req, res) => res.render('auth/login'));
authRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/auth/login',
    failureFlash: true,
}));

authRouter.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = authRouter;