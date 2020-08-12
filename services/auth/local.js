const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../../models/User');
const authHelpers = require('./auth-helpers');

const init = require('./passport');

const options = {};

init();

passport.use(
    new LocalStrategy(options, (username, password, done) => {
        User.findByUsername(username)
        .then(user => {
            if (!user) done(null, false);
            if (!authHelpers.comparePass(password, user.password_digest)) {
                return done(null, false);
            } else {
                return done(null, user);
            };
        })
        .catch(err => {
            console.log(err);
            return done(err);
        });
    })
);

module.exports = passport;