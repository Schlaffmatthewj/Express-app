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
        .then(cities => cities.map(city => new this(city)));
    }

    static getById(id) {
        return db
        .oneOrNone('SELECT * FROM cities WHERE id = $1', id)
        .then(city => {
            if (city) return new this(city);
            throw new Error('City not found');
        });
    }

    save() {
        return db
        .one(
            `INSERT INTO cities
            (name, longitude, latitude)
            VALUES
            ($/name/, $/longitude/, $/latitude)
            RETURNING *`,
            this
        )
        .then(savedCity => Object.assign(this, savedCity));
    }

    delete() {
        return db.oneOrNone('DELETE FROM cities WHERE id = $1', this.id);
    }
};

module.exports = City;