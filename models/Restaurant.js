const db = require('../db/config');

class Restaurant {
    constructor(rest) {
        this.id = rest.id;
        this.name = rest.name;
        this.address = rest.address;
        this.cuisine = rest.cuisine;
        this.restaurant_url = rest.restaurant_url
        this.menu_url = rest.menu_url;
        this.photos_url = rest.photos_url;
        this.city_id = rest.city_id;
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
            (name, address, cuisine, restaurant_url, menu_url, photos_url, city_id)
            VALUES
            ($/name/, $/address/, $/cuisine/, $/restaurant_url/, $/menu_url/, $/photos_url/, $/city_id/)
            RETURNING *`,
            this
        )
        .then(savedRest => Object.assign(this, savedRest))
        .catch(err => console.log(err));
    }
}

module.exports = Restaurant;