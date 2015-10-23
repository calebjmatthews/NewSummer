// grab the mongoose module
var mongoose = require('mongoose');

// define our plant model
module.exports = mongoose.model('plant', {
	name : {type : String, default: ''}
});