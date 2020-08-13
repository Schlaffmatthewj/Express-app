const db = require('../db/config');
const City = require('../models/City');




// THIS PAGE IS INACCURATE


class User_cities {
    constructor(user_cities) {
        this.id = user_cities.id;
        this.user_id = user_cities.user_id;
        this.city_id = user_cities.city_id;
    }

    static getAllByUser_id(id) {
        return db
        .manyOrNone('SELECT * FROM user_cities WHERE user_id = $1', id)
        .then(allCities => allCities.map(city => {
            console.log('GETALLBYUSERID', city);
            return City.getById(city.city_id);
        }))
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
        .then(savedFav => Object.assign(this, savedFav));
    }
};

module.exports = User_cities;