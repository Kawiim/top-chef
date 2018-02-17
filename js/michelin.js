const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
var rp = require('request-promise');

let writeStream = fs.createWriteStream('restaurants.json');

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
		        
				console.log(restaurant)
				writeStream.write(JSON.stringify(restaurant) + '\n'); 
				return resolve(restaurant)
    			
    		})
    		.catch(function(err){
    			console.log(err)
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
		    			console.log("All promises ended !")
			    		
			    	})
		    	})
		    	
		    })
		    
    }
}


