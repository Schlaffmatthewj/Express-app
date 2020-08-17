const db = require('../db/config');
const restaurantController = require('../controllers/restaurant-controller');

class Restaurant {
    constructor(rest) {
        this.id = rest.id;
        this.name = rest.name;
        this.zomato_city_id = rest.zomato_city_id;
        this.zomato_id = rest.zomato_id;
        this.city_id = rest.city_id;
    }

    static findByName(name) {
        return db
        .oneOrNone('SELECT * FROM restaurants WHERE id = $1', name)
        .then(rest => {
            if (rest) return new this(rest);
            throw new Error('No Restaurant Found')
        })
        // .catch(err => console.log(err));
    }

    static getById(id) {
        return db
        .oneOrNone('SELECT * FROM restaurants WHERE id = $1', id)
        .then(rest => {
            if (rest) return new this(rest);
            throw new Error('No Restaurant Found');
        })
        // .catch(err => console.log(err));
    }

    static getAllForUser(user_id) {
        return db
        .manyOrNone(
            `SELECT * FROM users
            JOIN user_restaurants ON users.id = user_restaurants.user_id
            JOIN restaurants ON user_restaurants.restaurant_id = restaurants.zomato_id
            WHERE users.id = $1`, user_id
        )
        .then(rests => rests.map(rest => new this(rest)))
        // .catch(err => console.log(err));
    };

    save() {
        return db
        .one(
            `INSERT INTO restaurants
            (name, zomato_city_id, zomato_id, city_id)
            VALUES
            ($/name/, $/zomato_city_id/, $/zomato_id/, $/city_id/)
            RETURNING *`,
            this
        )
        .then(savedRest => Object.assign(this, savedRest))
        // .catch(err => console.log(err));
    }
}

module.exports = Restaurant;