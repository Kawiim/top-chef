const express = require('express');
const app = express();
const michelin = require('./js/michelin');
const lafourchette = require('./js/lafourchette');
var mongoose = require('mongoose');
var Restaurant = require('./models/restaurant');

mongoose.connect('mongodb://localhost/topchef');


const enable_michelin_scrapping = true // You can decide to re scrapp at each start or only refreshing deals

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/starred', function (req, res) {
	Restaurant.find({}, function(err, restaurants) {
		if (err) throw err;
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(restaurants))
	})
})

app.get('/deals', function (req, res) {
	Restaurant.find({hasDeals: true}, function(err, restaurants) {
		if (err) throw err;
		res.send(restaurants)
	})
})

app.listen(6969, function () {
	console.log('Express server is listening on port 6969!')

	if(enable_michelin_scrapping) {
		michelin.loadRestaurants()
	} else {
		lafourchette.checkDeals()
	}

	
})