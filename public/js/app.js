'use strict';

(function() {
  var app = angular.module('newSummer', ['ui.bootstrap', 
    'game-directives',
    'fieldControllers',
    'menuControllers',
    'gridControllers',
    'accountControllers']);

  app.factory('plantService', function($http) {
    // Initial values for plant array
    var plants = [];

    return {
      getPlants: function() {
        return plants;
      },
      updatePlants: function(newPlants) {
        plants = newPlants;
      },
      // getTemplates to be obsoleted... maybe
      getTemplates: function() {
        return $http.get('/gene-processing/templates.json');
      },
      pullPlants: function(user_id) {
        return $http.get('/api/ns/plants/' + user_id);
      },
      postPlants: function(user_id, newPlants) {
        return $http.post(('/api/ns/plants/' + user_id), newPlants);
      },
      rePostPlants: function(user_id, newPlants) {
        $http.delete('/api/ns/plants/' + user_id)
        return $http.post(('/api/ns/plants/' + user_id), newPlants);
      }
    }
  });

  app.factory('globalService', function($http) {

    var globals = [];

    return { 
      pullAllUsers: function() {
        return $http.get('/api/ns');
      },
      postUser: function(newGlobals) {
        return $http.post('/api/ns', newGlobals);
      },
      rePostUser: function(newGlobals) {
        $http.delete('/api/ns');
        return $http.post('/api/ns', newGlobals);
      },
      getGlobals: function() {
        return globals;
      },
      // pullGlobals: function(user_id) {
      //   $http.get('/api/ns/' + user_id + '/globals').then(function(returnValues){
      //     console.log("inner: " + returnValues.beganDate);
      //     globals = returnValues;
      //   });
      //   return $http.get('/api/ns/:' + user_id);
      // },
      updateGlobals: function(newGlobals) {
        globals = newGlobals;
      }
    }
  });

  app.controller('GameController', ['$http', function($http) {
    // App-wide logic goes here
    
  }]);

})();