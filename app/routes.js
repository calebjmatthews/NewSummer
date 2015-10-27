var express = require('express');
var Plant = require('./models/plants.js');
var User = require('./models/globals.js');
var routerCounter = 0;
var router = express.Router();

module.exports = function(app) {

	// Middlewear which applies to all routes
	router.use(function(req, res, next) {
		routerCounter ++;
		console.log("Router actions: " + routerCounter);
		next();
	});

	router.route('/globals')

		// Post a new user
		.post(function(req, res) {
			// Copy data of the new user
			var user = new User();
			user.username = req.body.username;

			// Save the copied plant
			user.save(function(err) {
			if (err)
				res.send(err);	

			res.json({ message: 'User created!' });
			});
		})

		// Return the data of all users
		.get(function(req, res) {
			User.find(function(err, users) {
				if (err)
					res.send(err);

				res.json(users);
			});
		})

	router.route('/globals/:user_id')

		// Remove a user
		.delete(function(req, res) {
			User.remove({ 
				_id: req.params.user_id 
			}, function(err, user) {
				if (err)
					res.send(err);

				res.json({ message: 'Successfully deleted' });
			});
		});

	router.route('/plants')

		// Post a plant
		.post(function(req, res) {
			// Copy the new plant
			var plant = new Plant();
			var keys = Object.keys(req);
			for (var iii=0; iii<keys.length; iii++) {
				plant[keys[iii]] = req.body[keys[iii]];
			}

			// Save the copied plant
			plant.save(function(err) {
				if (err)
					res.send(err);	

				res.json({ message: 'Plant created!' });
			});
		})

	// Route Registration
	app.use('/api', router);

  // frontend route
  app.get('*', function(req, res) {
  	res.sendfile('./public/index.html');
  });

};