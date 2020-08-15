const db = require('../db/config');
const Restaurant = require('../models/Restaurant');


class User_restaurants {
    constructor(user_rest) {
        this.id = user_rest.id;
        this.user_id = user_rest.user_id;
        this.restaurant_id = user_rest.restaurant_id;
    }

    static getOneForUser(id, restaurant_id) {  // NEED ZOMATO ID HERE
        return db
        .oneOrNone('SELECT * FROM user_restaurants WHERE user_id = $1 AND restaurant_id = $2', [id, restaurant_id])
        .then(user_rest => new this(user_rest))
        .catch(err => console.log(err));
    }

    save() {
        return db
        .one(
            `INSERT INTO user_restaurants
            (user_id, restaurant_id)
            VALUES
            ($/user_id/, $/restaurant_id/)
            RETURNING *`,
            this
        )
        .then(savedFav => Object.assign(this, savedFav))
        .catch(err => console.log(err));
    }

    delete() {
        return db.oneOrNone('DELETE FROM user_restaurants WHERE id = $1', this.id);
    }
}

module.exports = User_restaurants;