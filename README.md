# TOP CHEF

> The best website if you're a food (and money !) lover ;)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [The web application](#the-web-application)
  - [Server-side with Node.js](#server-side-with-nodejs)
    - [Michelin Restaurant](#michelin-restaurant)
    - [Deals from LaFourchette](#deals-from-lafourchette)
  - [Client-side with React](#client-side-with-react)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## The web application
```sh
❯ git clone https://github.com/Kawiim/top-chef.git
❯ cd top-chef
```
### Server-side with Node.js
You need to have a MongoDB server running on default port 27017

Then to run the server : 
```sh
❯ node server
```
The total data fetching could take between 30 sec and 2/3 minutes depending on your internet connection. Sometimes, some requests are
blocked or your IP address can be blocked, so I exported the fetched data in JSON format, you can find it in the /data repository.
To import them manually in the MongoDB, use command : 

```sh
❯ mongoimport --db topchef --collection restaurants --file pathToFile/restaurants.json
```
(For some mysterious reasons, I had some issues when using my WiFi connection, but not at all using 4G network in shared mode.)

#### Michelin Restaurant

Using Request and Cheerio libraries, I scrapped on Michelin the complete list of starred restaurants in France.
To do so, I started by getting the number of pages on https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/

Then I created a loop to get the link of the detailed page for each restaurant. Then I loop through this link list to
be able to have complete data about each restaurant and save them in a Mongo database.

#### Deals from LaFourchette

For this part, I didn't have to use web scrapping methods due to the existence of a Web API. Using :
https://m.lafourchette.com/api/restaurant-prediction?name=RESTAURANT_NAME I was able to have a unique ID for each
restaurant, then using https://m.lafourchette.com/api/restaurant/RESTAURANT_ID/sale-type I have access to all the offers 
available for the restaurant. I just had to select the special offers and save them in my Mongo database too.

All the previous data are exposed by an express server on port 6969 allowing the React application to access them by using the following routes :

> http://localhost:6969/starred
> http://localhost:6969/deals

### Client-side with React

Then to run the React app : 
```sh
❯ npm start
```
The app is now available at http://localhost:3000/
There is 3 tabs, the first one is a quick presentation of the website. The second one, called "Starred" allows you to have
access to the full list of french starred restaurants with different kind of informaiton about it. And the last one, called "Deals",
allows you to ... yes you get it ! To go through the deals available for the starred restaurants right now ! So choose yours, and enjoy your meal !


