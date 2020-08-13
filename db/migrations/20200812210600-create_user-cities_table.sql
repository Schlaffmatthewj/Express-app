CREATE TABLE user_cities (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    city_id INTEGER NOT NULL REFERENCES cities(id)
);
