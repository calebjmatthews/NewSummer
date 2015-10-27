var menuControllers = angular.module('menuControllers', ['ui.bootstrap']);

menuControllers.controller('GatherController', ['$scope',
	function($scope) {
		$scope.gatheringAreas = ['Wild Grain', 'Primitive Corn', 'Millet'];
		
		$scope.uibToggleDropdown = function($event) {
		    $event.preventDefault();
		    $event.stopPropagation();
		    $scope.status.isopen = !$scope.status.isopen;
		  };
	}]);