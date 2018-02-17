const request = require('request');
const cheerio = require('cheerio');
var Restaurant = require('../models/restaurant');

module.exports = {
    checkDeals : function() {
    	console.log("Start scrapping on LaFourchette...")
    	Restaurant.find({}, function(err, restaurants) {
		  if (err) throw err;

		  // object of all the users
		  console.log(restaurants);
		});
    }
}