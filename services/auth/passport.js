const passport = require('passport');
const User = require('../../models/User');

module.exports = (() => {
    passport.serializeUser((user, done) => {
        done(null, user.username);
    });

    passport.deserializeUser((username, done) => {
        console.log('deserialize');
        User.findByUsername(username)
        .then(user => {
            console.log(user);
            console.log(done);
            return done(null, user);
        })
        .catch(err => done(err, null));
    });

    return passport;
})();