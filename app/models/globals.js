// grab the mongoose module
var mongoose = require('mongoose');

// define our global model
module.exports = mongoose.model('User', {
	username : {type : String, default: null},
	beganDate : {type : Date, default: Date.now},
	money : {type: Number, default: 0},
	fields : [{
		planted : {type: Number, default: 0},
		quality : {type: Number, default: 5}
	}]
});