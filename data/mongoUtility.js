var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/newSummer';

var collectionName = 'demeter';

var findPlants = function(db, callback) {
  var cursor =db.collection(collectionName).find( );
  cursor.each(function(err, doc) {
    assert.equal(err, null);
    if (doc != null) {
      console.dir(doc);
    } else {
    	callback();
    }
  });
};

var dropCollection = function(db, callback) {
   db.collection(collectionName).drop( function(err, response) {
      console.log(response)
      callback();
	});
};

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);

  findPlants(db, function() {
    db.close();

	// dropCollection(db, function() {
	// 	db.close();

	});
});