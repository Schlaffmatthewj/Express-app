const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');


const app = express();
require('dotenv').config();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`We've made contact with port: ${PORT}`)
});

app.get('/', (req, res) => {
    res.send('HELLO WORLD');
});


app.use('*', (req, res) => {
    res.status(404).send({
        error: 'Not Found',
    });
});