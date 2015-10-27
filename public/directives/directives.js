(function(){
  var app = angular.module('game-directives', []);

  app.directive("nsLoginModal", function() {
    return{
      restrict: 'E',
      templateUrl: 'directives/ns-login-modal.html'
    };
  });

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

  app.directive("nsPgrid", function() {
    return{
      restrict: 'E',
      templateUrl: 'directives/ns-pgrid.html'
    };
  });
})();