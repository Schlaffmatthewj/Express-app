const db = require('../db/config');

class User {
    constructor(user) {
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.password_digest = user.password_digest;
    }

    static findByUsername(username) {
        return db.oneOrNone('SELECT * FROM users WHERE username = $1', username);
    }

    static getById(id) {
        return db
        .oneOrNone('SELECT * FROM users WHERE id = $1', id)
        .then(user => new this(user));
    }

    save() {
        return db
        .one(
            `INSERT INTO users
            (username, email, password_digest)
            VALUES
            ($/username/, $/email/, $/password_digest/)
            RETURNING *`,
            this
        )
        .then(savedUser => Object.assign(this, savedUser));
    }

    update(changes) {
        Object.assign(this, changes);
        return db
        .oneOrNone(
            `UPDATE users SET
            username = $/username/,
            email = $/email/,
            password_digest = $/password_digest/
            WHERE id = $/id/
            RETURNING *`,
            this
        )
        .then(user => Object.assign(this, user));
    }

    delete() {
        return db.oneOrNone('DELETE FROM users WHERE id = $1', this.id);
        // NEED TO ALSO DELETE FROM THE user_cities & user_restaurants????
    }


    // NEED PARAMS AND TO JOIN THE TABLES \/\/\/
    getAllCities() {
        return db.manyOrNone('SELECT * FROM user_cities WHERE id = $1', this.id);
    }

    getCityById() {
        // not quite sure yet with the join
    }

    getAllRestaurants() {
        return db.manyOrNone('SELECT * FROM user_restaurants WHERE id = $1', this.id)
    }
    
    getRestaurantById() {
        // not quite sure yet with the join
    }
    // NEED PARAMS AND TO JOIN THE TABLES ^^^^


    deleteCity() {
        return db.oneOrNone('DELETE FROM user_cities WHERE id = $1,', this.id);
    }

    deleteRestaurant() {
        return db.oneOrNone('DELETE FROM user_restaurants WHERE id = $1', this.id);
    }
}

module.exports = User;