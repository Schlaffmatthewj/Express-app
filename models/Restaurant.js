const db = require('../db/config');

class Restaurant {
    constructor(rest) {
        this.id = rest.id;
        this.name = rest.name;
        this.city_id = rest.city_id;
        this.zomato_id = rest.zomato_id;
    }

    static findByName(name) {
        return db
        .oneOrNone('SELECT * FROM restaurants WHERE id = $1', name)
        .then(rest => {
            if (rest) return new this(rest);
            throw new Error('No Restaurant Found')
        })
        .catch(err => console.log(err));
    }

    static getById(id) {
        return db
        .oneOrNone('SELECT * FROM restaurants WHERE id = $1', id)
        .then(rest => {
            if (rest) return new this(rest);
            throw new Error('No Restaurant Found');
        })
        .catch(err => console.log(err));
    }

    save() {
        return db
        .one(
            `INSERT INTO restaurants
            (name, city_id, zomato_id)
            VALUES
            ($/name/, $/city_id/, $/zomato_id/)
            RETURNING *`,
            this
        )
        .then(savedRest => Object.assign(this, savedRest))
        .catch(err => console.log(err));
    }
}

module.exports = Restaurant;