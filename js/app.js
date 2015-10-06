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
        return $http.get('./gene-processing/plants.json');
      }
    }
  });

  app.controller('GameController', ['$http', function($http) {
    // var nsData = this;
    // nsData.cultivars = [];
    // $http.get('./gene-processing/cultivars.json').success(function(data){
    //   nsData.cultivars = data;
    // });
    
  }]);

})();