const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

let writeStream = fs.createWriteStream('restaurants.json');

module.exports = {
    getRestaurantsFrance : function() {

    	var url = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin',
    		nbPages,
    		pageUrl,
    		nbSolved = 0,
    		nbRest = 0

	    request(url, function(error, response, html){
	        if(!error){

	            var $ = cheerio.load(html)
	            nbPages = $('ul.pager.mr-pager-first-level-links > li.mr-pager-item.last').prev().children().attr('attr-page-number')

	            for(var i = 0; i < nbPages; i++){
	            	pageUrl = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-' + (i+1)
	            	
					request(pageUrl, function(error, response, html){
				    	if(!error){
				    		var $_2 = cheerio.load(html)

				    		$_2('.poi-search-result li .node--poi-card').each(function(i, elm) {
				    			var restaurant = {  
								    name: $_2(this).attr('attr-gtm-title')
								};
				    			writeStream.write(JSON.stringify(restaurant) + '\n');  
				    		})
				    	}
				    })
	            }
	        }
	    })
    }
}