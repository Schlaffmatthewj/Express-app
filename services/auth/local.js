const passport = require('./passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../../models/User');
const authHelpers = require('./auth-helpers');

const options = {};

passport.use(
    new LocalStrategy(options, (username, password, done) => {
        console.log('local strategy');
        User.findByUsername(username)
        .then(user => {
            console.log(user);
            if (!user) done(null, false);
            if (!authHelpers.comparePass(password, user.password_digest)) {
                console.log('unsuccessful test');
                return done(null, false);
            } else {
                console.log('successful check');
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