const db = require('../db/config');
const Restaurant = require('../models/Restaurant');


class User_restaurants {
    constructor(user_rest) {
        this.id = user_rest.id;
        this.user_id = user_rest.user_id;
        this.city_id = user_rest.city_id;
    }

    static getOneForUser(id, city_id) {
        return db
        .oneOrNone('SELECT * FROM user_restaurants WHERE user_id = $1 AND city_id = $2', [id, city_id])
        .then(user_rest => new this(user_rest))
        .catch(err => console.log(err));
    }

    save() {
        return db
        .one(
            `INSERT INTO user_restaurants
            (user_id, city_id)
            VALUES
            ($/user_id/, $/city_id/)
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