# My Favorite Restaurants

<a href="#">Heroku-----THIS IS A DUD CURRENTYLY-----</a>

### Description

**Allows you to search by city to see your area's popular restaurants and cuisine.**

## Project Workflow
### Wire Frames
<a href=/README/wireframes.md>--WIREFRAMES--</a>

### Schema diagram
<a href=/README/schema.md>--SCHEMA--</a>

### User Story

- You can create a profile with your name, email, password and an username. 
- You can edit your user's information and delete your user's account. 
- There is a search page with preloaded cities and a button that allows you to search for more.
- When on a city's page you will be able to save shortcuts to cities on your profile page.
- City pages will get various popular data from Zomato's API on city cuisine and nearby locations.
- The restaurants also have links to their own content and from their page you can save that shortcut also
- Restaurant pages show their times, address, menu links and links to even more information.
- You may also remove any city or restaurant from your profile page.

### HTTP Routes

- GET '/', homepage
- GET '/auth'
    - GET '/login', sign into account
    - GET '/logout', signout of account
- GET '/city/:id', shows a single city's info
    - POST '/', adds city to global search page
- GET '/restaurant/:id', shows a single restaurant's info
    - POST '/', adds restaurant's info to the database
- GET '/user', index shows all shortcuts for a user
    - GET '/new', create new account
    - POST '/', adds new user to database
    - PUT '/:id', change name and email
    - GET '/:id/edit' shows form to change user info
    - DELETE '/:id', this user completely
    - POST '/city/:id', saves shortcut to city on profile
    - DELETE '/city/:id', this city from user profile (join table)
    - POST '/rest/:id', shows shortcut to restaurants on profile
    - DELETE 'rest/:id', this restaurant from user profile (join table)
- GET '/search', shows all of the globally listed cities
    - GET '/new' form for new city query
    

## Specs

- Technologies
    - Postgres-SQL
    - Node.js
    - Express

- API
    - Zomato's API
        - Found city coordinates from simple text query
        - Then I used the coordinates to get a much more detailed pack of info from Zomato
        - Then used the specifics to find and get restaurants to show their information

- Modules
    - bcyrptjs
    - body-parser
    - cookie-parser
    - dotenv
    - ejs
    - express
    - express-session
    - method-override
    - morgan
    - node-fetch
    - nodemon
    - passport
    - passport-local
    - pg-promise

## My Favorite Bit From This Project

- sneaking bits of info into the url as an 'id' but they were used for the next query for their params.

## Fix or Add

- 'Find Me' locator, or be able to order and list the cities by states.

## Start-up Walk-through

- Npm Install .. ETC ..
