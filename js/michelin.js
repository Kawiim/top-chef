const request = require('request');
const cheerio = require('cheerio');
const lafourchette = require('./lafourchette');
var rp = require('request-promise');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/topchef');

var Restaurant = require('../models/restaurant');


function getRestName(url){
	var options_rest = {
	    uri: url,
 	    resolveWithFullResponse: true,
	    transform: function (body) {
	        return cheerio.load(body);
	    }
	};

	return new Promise((resolve, reject) => {
		rp(options_rest)
		    .then(function ($) {
		    	var name = $('.restaurant_base-breadcrumbs-list').children().last().children().children().text()
		    		address = $('div[itemprop="address"] > div > div > div > div > .thoroughfare').text()
		    		city = $('div[itemprop="address"] > div > div > div > div > .locality').text()
		    		postalCode = $('div[itemprop="address"] > div > div > div > div > .postal-code').text()
		    		priceRange = $('span[itemprop="priceRange"]').text()

		    	var restaurant = {
		    		name: name, 
		    		address: address + ", " + postalCode + " " + city, 
		    		priceRange: priceRange
		    	}

				return resolve(restaurant)
    			
    		})
    		.catch(function(err){
    			console.error(err)
    			return reject(err)
    		})
    })
}


module.exports = {

    loadRestaurants : function() {
    	var url = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin',
    		nbPages, pageUrl, pageUrls =[], nbSolved = 0, nbRest = 0, pageRequestPromises = []

    	var options = {
		    uri: url,
		    transform: function (body) {
		        return cheerio.load(body);
		    }
		};
		 
		rp(options)
		    .then(function ($) {
	            nbPages = $('ul.pager.mr-pager-first-level-links > li.mr-pager-item.last').prev().children().attr('attr-page-number')
	            
	            for(var i = 0; i < nbPages; i++){
	            	pageUrl = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-' + (i+1)
	            	var options_pages = {
					    uri: pageUrl,
					    timeout: 600000,
					    transform: function (body) {
					        return cheerio.load(body);
					    }
					};

	            	pageRequestPromises.push(rp(options_pages)
			            .then(function ($) {
			                $('div[attr-gtm-type="poi"]').each((index, element) => {
			                    pageUrls.push('https://restaurant.michelin.fr' + $(element).find('.poi-card-link').attr('href'));
			                });
			            })
			        )
	            }
		    })
		    .then(function(){            	
		    	Promise.all(pageRequestPromises).then(() => {
		    		console.log(pageUrls.length)
		    		var promises = pageUrls.map(url => getRestName(url))

		    		Promise.all(promises).then(result => {
						var restTemp
						Restaurant.remove({}, function(err) { 
						   console.log('collection removed') 
						});

						savingRequestPromises = []

						result.forEach(function(res){
							savingRequestPromises.push(new Promise((resolve, reject) => {
								restTemp = new Restaurant({name: res.name, address: res.address, priceRange: res.priceRange})
								restTemp.save(function(err, rest){
									if(err) return console.error(err)
									resolve()
								})
							}))
							
						})

						Promise.all(savingRequestPromises).then(function(err){
							console.log("Scrapping on Michelin is over, let's check the deals on LaFourchette !")
		    				lafourchette.checkDeals()
						})
		    			
			    		
			    	})
		    	})
		    	
		    })
		    
    }
}


