const express = require('express');
const app = express();
const michelin = require('./js/michelin');
const lafourchette = require('./js/lafourchette');


app.get('/', function (req, res) {
	res.send('temp')
})

app.listen(3000, function () {
  console.log('My super app is listening on port 3000!')

  michelin.loadRestaurants()
  //lafourchette.checkDeals()

})