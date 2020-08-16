const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const authRouter = require('./routes/auth-router');
const cityRouter = require('./routes/city-router');
const restaurantRouter = require('./routes/restaurant-router');
const searchRouter = require('./routes/search-router');
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

app.get('/', (req, res) => res.render('index'));
app.get('/about', (req, res) => res.render('about'));

app.use('/auth', authRouter);
app.use('/city', cityRouter);
app.use('/restaurant', restaurantRouter);
app.use('/search', searchRouter);
app.use('/user', userRouter);

app.use('*', (req, res) => {
    res.status(404).render('errors/no_page', {
        message: 'Error',
        data: {
            Error: err,
            Error_message: err.message,
        },
    });
});

app.use((err, req, res, next) => {
    res.status(500).render('errors/idk', {
        message: 'Error',
        data: {
            Error: err,
            Error_message: err.message,
        },
    });
});