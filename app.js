const express = require('express');
const app = express();
const michelin = require('./js/michelin');
const lafourchette = require('./js/lafourchette');

const enable_michelin_scrapping = false

app.get('/', function (req, res) {
	res.send('temp')
})

app.listen(3000, function () {
	console.log('My super app is listening on port 3000!')

	if(enable_michelin_scrapping) {
		michelin.loadRestaurants()
	} else {
		lafourchette.checkDeals()
	}

	
})