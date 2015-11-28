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
      // getTemplates to be obsoleted
      getTemplates: function() {
        return $http.get('/gene-processing/templates.json');
      },
      pullPlants: function(user_id) {
        return $http.get('/api/ns/:' + user_id + '/plants');
      },
      postPlants: function(user_id) {
        $http.delete('/api/ns/:' + user_id + '/plants')
        return $http.post('/api/ns/plants', plants);
      }
    }
  });

  app.factory('globalService', function($http) {

    var globals = [];

    return { 
      pullAllUsers: function() {
        return $http.get('/api/ns');
      },
      getGlobals: function() {
        return globals;
      },
      pullGlobals: function(user_id) {
        return $http.get('/api/ns/:' + user_id);
      }
    }
  });

  app.controller('GameController', ['$http', function($http) {
    // App-wide logic goes here
    
  }]);

})();