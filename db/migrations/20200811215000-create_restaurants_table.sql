CREATE TABLE IF NOT EXISTS restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    zomato_id INTEGER UNIQUE NOT NUll,
    zomato_city_id INTEGER NOT NULL,
    city_id INTEGER NOT NULL REFERENCES cities(id)
);
