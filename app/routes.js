// grab the plant model
var Models = require('./models/mainModels.js');

module.exports = function(app) {
	app.get('/api/test', function(req, res) {
		// use mongoose to get all plant entries in database
		Models.find(function(err, plants) {

			// If there is an error retrieving, send the error
			if (err)
				res.send(err);

			// Otherwise return all plant entries
			res.json(pltnas);
		});
	});

	// route to handle creating goes here (app.post)
  // route to handle delete goes here (app.delete)

  // frontend route
  app.get('*', function(req, res) {
  	res.sendfile('./public/index.html');
  });

};