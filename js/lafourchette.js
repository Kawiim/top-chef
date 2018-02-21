const request = require('request');
const cheerio = require('cheerio');
var Restaurant = require('../models/restaurant');
var rp = require('request-promise');
var stringSimilarity = require('string-similarity');

const searchRestUrl = "https://m.lafourchette.com/api/restaurant-prediction?name="
const searchByIdUrl = "https://m.lafourchette.com/api/restaurant/"

module.exports = {
    checkDeals : function() {
    	console.log("Start getting deals on LaFourchette...")
    	Restaurant.find({}, function(err, restaurants) {
			if (err) throw err;

			restaurants.forEach(function(restaurant){
				var options = {
				    uri: encodeURI(searchRestUrl + restaurant.name),
				};

				rp(options)
					.then(function(body){
						var parsed_results = JSON.parse(body)
						var rest_lafourchette_id
						var options_id
						var found = false

						if(parsed_results.length > 0){
							if(parsed_results.length == 1 && stringSimilarity.compareTwoStrings(restaurant.name, parsed_results[0].name) >= 0.7){
								rest_lafourchette_id = parsed_results[0].id
								found = true
							} else if(parsed_results.length > 1){
								parsed_results.forEach(function(res){
									if(stringSimilarity.compareTwoStrings(restaurant.name, parsed_results[0].name) >= 0.7 
										&& restaurant.address.indexOf(res.address.postal_code) > -1){
										rest_lafourchette_id = res.id
										found = true
									}
								})
							} 

							if(found){
								options_id = {
								    uri: searchByIdUrl + rest_lafourchette_id + "/sale-type",
								};

								rp(options_id)
									.then(function(body){
										var rest_data = JSON.parse(body)
										console.log(rest_data)
									})

							}
							
						}
						
					})


			})

		});
    }
}