const db = require('../db/config');
const City = require('../models/City');


class User_cities {
    constructor(user_cities) {
        this.id = user_cities.id;
        this.user_id = user_cities.user_id;
        this.city_id = user_cities.city_id; // NEEDS TO BE ZOMATO ID
    }

    static getOneForUser(id, city_id) {
        // console.log('User ID', id);
        // console.log('City ID', city_id);             ZOMATO ID NOT CITY ID
        return db
        .oneOrNone('SELECT * FROM user_cities WHERE user_id = $1 AND city_id = $2', [id, city_id])
        .then(user_city => new this(user_city))
        .catch(err => console.log(err));
    }

    save() {
        return db
        .one(
            `INSERT INTO user_cities
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
        return db.oneOrNone('DELETE FROM user_cities WHERE id = $1', this.id);
    }
};

module.exports = User_cities;