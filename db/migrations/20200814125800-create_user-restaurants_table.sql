CREATE TABLE IF NOT EXISTS user_restaurants (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    restaurant_id INTEGER NOT NULL REFERENCES restaurants(zomato_id)
);