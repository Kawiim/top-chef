const express = require('express');
const app = express();
const michelin = require('./js/michelin');

app.get('/', function (req, res) {
	michelin.getRestaurantsFrance(function(restaurantsList) {
  		res.send("restaurantsList")
	})
	
})

app.listen(3000, function () {
  console.log('My super app is listening on port 3000!')
})