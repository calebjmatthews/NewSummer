'use strict';

(function() {
  var app = angular.module('newSummer', 
    ['ui.bootstrap', 
    'game-directives',
    'fieldControllers',
    'menuControllers',
    'gridControllers',
    'accountControllers']);

  app.service('plantService', function($http) {
    return {
      getPlants: function() {
        return $http.get('/api/plants');
      },
      getTemplates: function() {
        return $http.get('gene-processing/templates.json');
      },
      postPlant: function(currPlant) {
        return $http('/api/plants', currPlant);
      }
    }
  });

  app.service('globalService', function($http) {
    return {
      // Get all global data
      getGlobals: function() {
        return $http.get('/api/globals');
      },
      // Register a new user
      postGlobal: function(newUser) {
        return $http('/api/globals', newUser);
      }
    }
  })

  app.controller('GameController', ['$http', function($http) {
    // App-wide logic goes here
    
  }]);

})();