const db = require('../db/config');

class User {
    constructor(user) {
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.password_digest = user.password_digest;
    }

    static findByUserName(username) {
        return db.oneOrNone('SELECT * FROM users WHERE username = $1', username);
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
}