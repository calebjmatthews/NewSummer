'use strict';

(function() {
  var app = angular.module('newSummer', ['ui.bootstrap', 
    'game-directives',
    'fieldControllers',
    'menuControllers',
    'gridControllers']);

  app.service('plantService', function($http) {
    return {
      getPlants: function() {
        return $http.get('./gene-processing/demeter.json');
      },
      postPlants: function(currPlants) {
        return $http({
          withCredentials: false,
          method: 'post',
          url: './gene-processing/demeter.json',
          data: currPlants,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
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