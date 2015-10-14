'use strict';

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/newSummer';

var collectionName = 'demeter';

var findMongoPlants = function(db, callback) {
	var cursor = db.collection(collectionName).find();
	cursor.each(function(err, doc) {
		assert.equal(err, null);
		if (doc != null) {
			return doc;
		}
		else {
			callback();
		}
	})
}

(function() {
	var app = angular.module('mongoTestApp', []);

	app.service('plantService', function() {
		return {
			getPlants: function() {
				MongoClient.connect(url, function(err, db) {
					assert.equal(null, err);

					return findMongoPlants(db, function() {
						db.close();
					});
				});
			}
			// updatePlants: function() {
			// 	// Code here
			// }
		}
	});

	app.controller('TestCtrl', ['$scope', 'plantService', 
		function($scope, plantService) {
			$scope.myPlants = [];

			plantService.getPlants().then(function(returnValues){
				$scope.myPlants = returnValues.data;
			});
		}]);
});