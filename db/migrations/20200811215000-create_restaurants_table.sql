CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    zomato_id INTEGER NOT NUll,
    city_id INTEGER NOT NULL REFERENCES cities(id)
);
