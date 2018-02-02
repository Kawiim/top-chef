const request = require('request');
const cheerio = require('cheerio');


// TODO : GO ON https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin
// 1st rqst for nb of pages, then getting all restaurants of each pages instead of the index 
module.exports = {
    getRestaurantsFrance : function(callback) {

    	var url = 'https://restaurant.michelin.fr/restaurants-etoiles-france/',
    		restaurantsList = [];
	    request(url, function(error, response, html){
	        if(!error){

	            var $ = cheerio.load(html);

                $('.content .field .field__items .field__item a').each(function(i, elm) {
				    var url_lvl2 = $(this).attr('href')
				    request(url_lvl2, function(error, response, html){
				    	if(!error){
				    		var $_2 = cheerio.load(html);

				    		$_2('.poi-search-result li .node--poi-card').each(function(i, elm) {
				    			var title = $_2(this).attr('attr-gtm-title')
				    			restaurantsList.add()

				    		})
				    	}
				    })
				});

                callback("listRest");
	        }
	    })
    }
}