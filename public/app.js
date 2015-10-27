'use strict';

(function() {
  var app = angular.module('newSummer', ['ui.bootstrap', 
    'game-directives',
    'fieldControllers',
    'menuControllers',
    'gridControllers']);

  app.factory('plantService', function($http) {
    return {
      getPlants: function() {
        return $http.get('/api/plants');
      },
      getTemplates: function() {
        return $http.get('/gene-processing/templates.json');
      }
      postPlant: function(currPlant) {
        return $http.post('/api/plants', currPlant);
      }
    }
  });

  app.service('globalService', function($http) {
    return {
      getGlobals: function() {
        return $http.get('./other-logic/globals.json');
      }
    }
  })

  app.controller('GameController', ['$http', function($http) {
    // App-wide logic goes here
    
  }]);

})();