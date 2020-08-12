const bcrypt = require('bcryptjs');

function comparePass(userPassword, databasePassword) {
    bcrypt.compareSync(userPassword, databasePassword);
};

function loginRedirect(req, res, next) {
    if (req.user) res.redirect('/user');
    return next();
};

function loginRequired(req, res, next) {
    if (!req.user) res.redirect('/auth/login');
    return next();
};

module.exports = {
    comparePass,
    loginRedirect,
    loginRequired,
};