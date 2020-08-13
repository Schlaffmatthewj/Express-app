const db = require('../db/config');
const City = require('./City');

class User {
    constructor(user) {
        this.id = user.id || null;
        this.username = user.username;
        this.email = user.email;
        this.password_digest = user.password_digest;
    }

    static findByUsername(username) {
        return db
        .oneOrNone('SELECT * FROM users WHERE username = $1', username)
        .then(user => {
            if (user) return new this(user);
            throw new Error('no user found');
        });
    }

    static getById(id) {
        return db
        .oneOrNone('SELECT * FROM users WHERE id = $1', id)
        .then(user => {
            if (user) return new this(user);
            throw new Error('no user found');
        });
    }

    save() {
        return db
        .one(
            `INSERT INTO users
            (username, email, password_digest)
            VALUES ($/username/, $/email/, $/password_digest/)
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
        .then(updatedUser => Object.assign(this, updatedUser));
    }

    // THIS NEED TO CLEAR OUT THE JOIN TABLES ALSO
    delete() {
        return db.oneOrNone('DELETE FROM users WHERE id = $1', this.id);
    }

    findUserCities() {
        return db
        .manyOrNone(
            `SELECT * FROM cities
            JOIN user_cities ON cities.id = user_cities.city_id
            JOIN users ON user_cities.user_id = users.id
            WHERE users.id = $1`, this.id
        )
        .then(cities => cities.map(city => new City(city)));
    }
};

module.exports = User;