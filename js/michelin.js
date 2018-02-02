const request = require('request');
const cheerio = require('cheerio');

module.exports = {
    getRestaurantsFrance : function(callback) {

    	var url = 'https://restaurant.michelin.fr/restaurants-etoiles-france/';
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
				    			console.log(title)

				    		})
				    	}
				    })
				});

                callback("listRest");
	        }
	    })
    }
}