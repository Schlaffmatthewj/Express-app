const db = require('../db/config');

class User {
    constructor(user) {
        this.id = user.id || null;
        this.name = user.name;
        this.username = user.username;
        this.email = user.email;
        this.password_digest = user.password_digest;
    }

    static findByUsername(username) {
        return db
        .oneOrNone('SELECT * FROM users WHERE username = $1', username)
        .then(user => {
            if (user) return new this(user);
            throw new Error('No User Found');
        })
        .catch(err => console.log(err));
    }

    static getById(id) {
        return db
        .oneOrNone('SELECT * FROM users WHERE id = $1', id)
        .then(user => {
            if (user) return new this(user);
            throw new Error('No User Found');
        })
        .catch(err => console.log(err));
    }

    save() {
        return db
        .one(
            `INSERT INTO users
            (username, name, email, password_digest)
            VALUES 
            ($/username/, $/name/, $/email/, $/password_digest/)
            RETURNING *`,
            this
        )
        .then(savedUser => Object.assign(this, savedUser))
        .catch(err => console.log(err));
    }

    update(changes) {
        Object.assign(this, changes);
        return db
        .oneOrNone(
            `UPDATE users SET
            username = $/username/,
            name = $/name/,
            email = $/email/,
            password_digest = $/password_digest/
            WHERE id = $/id/
            RETURNING *`,
            this
        )
        .then(updatedUser => Object.assign(this, updatedUser))
        .catch(err => console.log(err));
    }

    delete() {
        return db.oneOrNone('DELETE FROM users WHERE id = $1', this.id);
    }
};

module.exports = User;