(function(){
  var app = angular.module('game-directives', []);

  app.directive("nsNavbar", function() {
  	return{
  		restrict: 'E',
  		templateUrl: 'directives/ns-navbar.html'
  	};
  });

  app.directive("nsFields", function() {
  	return{
  		restrict: 'E',
  		templateUrl: 'directives/ns-fields.html'
  	};
  });
})();