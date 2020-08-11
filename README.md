# My Favorite Restaurants

### Description

**Allows you to search by city and or use a "find me" feature to see you area's popular restaurants and cuisine.**

## Project Workflow
### Wire Frames
<a href=/README/wireframes.md>--WIREFRAMES--</a>

### Schema diagram
<a href=/README/schema.md>--SCHEMA--</a>

### User Story

- you can create a profile and have saved locations (cities).
- saved cities will get various popular data from fetch on city cuisine and nearby locations.
- you can save fav restaurants within city and view their menus and have available menus and links.
- you can see saved cities, restaurants, menus, and shortcut-links to order from your profile.
- add new cities, locations, and also remove them.

### HTTP Routes

- GET '/', homepage
- GET '/auth'
    - GET '/register', new user
        - POST '/user'
    - GET '/login', sign into account
    - GET '/logout', signout of account
- GET '/user', index shows all cities in database
    - GET '/:id', individual profile with personal shortcuts to cities & restaurants
    - PUT '/:id', change username and email
    - DELETE '/:id', this user completely
    - GET '/city', shows all saved cities
    - GET '/city/:id', shows single city's info
    - DELETE '/city/:id', this city from user profile (join table)
    - GET '/rest', shows all saved restaurants
    - GET '/rest/:id', shows single restaurants info
    - DELETE 'rest/:id', this restaurant from user profile (join table)
- GET '/search'
    - GET '/city', shows all available cities w/ new input available
        - POST '/user/city', saves to user profile
        - POST '/city', saves city in the city database
    - GET '/rest', shows all new restaurants from selected city
        - POST '/user/rest' saves restaurant to user profile & restaurant database
        - POST '/rest', saves restaurant to the restaurant database

## Specs

- Technologies

- API

- Modules

## My Favorite Bit From This Project

- IDK yet!!

## Fix or Add

- I'd love to get comments into this.. potentially..

## Start-up Walk-through

- Npm Install .. ETC ..
