const db = require('../db/config');

class City {
    constructor(city) {
        this.id = city.id;
        this.name = city.name;
        this.longitude = city.longitude;
        this.latitude = city.latitude;
    }

    static getAll() {
        return db
        .manyOrNone('SELECT * FROM cities ORDER BY name ASC')
        .then(cities => cities.map(city => new this(city)))
        .catch(err => console.log(err));
    }

    static getAllForUser(user_id) {
        return db
        .manyOrNone(
            `SELECT * FROM users
            JOIN user_cities ON users.id = user_cities.user_id
            JOIN cities ON user_cities.city_id = cities.id
            WHERE users.id = $1`, user_id
        )
        .then(cities => cities.map(city => new this(city)))
        .catch(err => console.log(err));
    }

    static getById(id) {
        return db
        .oneOrNone('SELECT * FROM cities WHERE id = $1', id)
        .then(city => new this(city))
        .catch(err => console.log(err));
    }

    save() {
        return db
        .one(
            `INSERT INTO cities
            (name, longitude, latitude)
            VALUES
            ($/name/, $/longitude/, $/latitude/)
            RETURNING *`,
            this
        )
        .then(savedCity => Object.assign(this, savedCity))
        .catch(err => console.log(err));
    }
};

module.exports = City;