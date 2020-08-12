const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const authRouter = require('./routes/auth-router');
// const searchRouter = require('./routes/search-router');
const userRouter = require('./routes/user-router');

const app = express();
require('dotenv').config();

app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());


app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`We've made contact with port: ${PORT}`)
});

app.get('/', (req, res) => {
    console.log('HOME PAGE USER', req.user)
    res.render('index');
});


app.use('/auth', authRouter);
// app.use('/search', searchRouter);
app.use('/user', userRouter);


app.use('*', (req, res) => {
    res.status(404).send({
        error: 'Not Found',
    });
});

app.use((err, req, res, next) => {
    res.status(500).send({ err, message: err.message });
});