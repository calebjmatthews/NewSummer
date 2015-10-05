var menuControllers = angular.module('menuControllers', []);

menuControllers.controller('GatherController', ['$scope',
	function($scope) {
		$scope.gatheringAreas = ['Wild Grain', 'Primitive Corn', 'Millet'];
		
		$scope.toggleDropdown = function($event) {
		    $event.preventDefault();
		    $event.stopPropagation();
		    $scope.status.isopen = !$scope.status.isopen;
		  };
	}]);