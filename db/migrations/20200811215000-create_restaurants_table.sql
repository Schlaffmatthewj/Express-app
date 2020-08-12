CREATE TABLE restaurants (
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    cuisine text,
    average_cost VARCHAR(255),
    restaurant_url text,
    menu_url text,
    photos_url text,
    order_by_url text,
    zomato_id INTEGER,
    city_id INTEGER NOT NULL REFERENCES cities(id)
);

-- DON'T FORGET ABOUT THE TWO JOIN TABLES