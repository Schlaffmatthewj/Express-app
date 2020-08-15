CREATE TABLE IF NOT EXISTS cities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    zomato_id INTEGER UNIQUE NOT NULL,
    longitude numeric(24, 20),
    latitude numeric(24, 20)
);
