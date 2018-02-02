const request = require('request');
const cheerio = require('cheerio');

module.exports = {
    getRestaurantsFrance : function(callback) {

    	var url = 'https://restaurant.michelin.fr/restaurants-etoiles-france/';
	    request(url, function(error, response, html){
	        if(!error){

	            var $ = cheerio.load(html);
	            var listRest;

                $('.field__item a').each(function(i, elm) {
				    console.log($(this).text()) 
				});

                callback("listRest");
	        }
	    })
    }
}