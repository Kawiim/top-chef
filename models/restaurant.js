var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var restaurantSchema = mongoose.Schema({
  name: String,
  address: String,
  priceRange: String,
  hasDeals: Boolean,
  deals: []
});

var Restaurant = mongoose.model('Restaurant', restaurantSchema)

module.exports = Restaurant;