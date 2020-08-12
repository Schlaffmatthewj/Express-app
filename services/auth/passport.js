const passport = require('passport');
const User = require('../../models/User');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.username)
    });

    passport.deserializeUser((username, done) => {
        User.findByUsername(username)
        .then(user => done(null, user))
        .catch(err => done(err, null));
    });
    return passport;
};