var gridControllers = angular.module('gridControllers', []);

gridControllers.controller('SeedGridCtrl', ['$scope', 'plantService',
	function($scope, plantService) {

		// Pull plant data from plantService
		$scope.currPlants = [];
		$scope.gridPlants = [];
		plantService.getPlants().then(function(returnValues){
			$scope.currPlants = returnValues.data;

			for (var iii=0; iii<96; iii++) {
				if ($scope.currPlants[iii] != undefined) {
					this.gridTemplate = {
						'plantName': ($scope.currPlants[iii]['adjective']
		 							+ " " + $scope.currPlants[iii]['specName']),
						'plantClass': ("glyphicon nsBright glyphicon-grain")
					};
				}
				else {
					this.gridTemplate = {
						'plantName': "",
						'plantClass': ("empty")
					};
				}
				$scope.gridPlants.push(this.gridTemplate);
			}
		});
	}]);

gridControllers.controller('PollenGridCtrl', ['$scope', 'plantService',
	function($scope, plantService) {

		// Pull plant data from plantService
		$scope.currPlants = [];
		$scope.gridPlants = [];
		plantService.getPlants().then(function(returnValues){
			$scope.currPlants = returnValues.data;

			for (var iii=0; iii<96; iii++) {
				if ($scope.currPlants[iii] != undefined) {
					this.gridTemplate = {
						'plantName': ($scope.currPlants[iii]['adjective']
		 							+ " " + $scope.currPlants[iii]['specName']),
						'plantClass': ("glyphicon nsBright glyphicon-certificate")
					};
				}
				else {
					this.gridTemplate = {
						'plantName': "",
						'plantClass': ("empty")
					};
				}
				$scope.gridPlants.push(this.gridTemplate);
			}
		});
	}]);