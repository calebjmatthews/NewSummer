var gridControllers = angular.module('gridControllers', []);

gridControllers.controller('SeedGridCtrl', ['$scope', 'plantService',
	function($scope, plantService) {

		// Pull plant data from plantService
		$scope.currPlants = [];
		$scope.gridPlants = [];
		plantService.getPlants().then(function(returnValues){
			$scope.currPlants = returnValues.data;
			// Select only plants that fit the current username, or template

			// Fill grid spaces with seeds/cuttings
			for (var iii=0; iii<96; iii++) {
				if ($scope.currPlants[iii] != undefined) {
					// If the genotype has both a seed and a cutting, make a grid unit for each
					if (($scope.currPlants[iii]['numSeeds'] > 0)
					 && ($scope.currPlants[iii]['numCuttings'] > 0)) {
						this.seedGrid = {
							'plantName': ($scope.currPlants[iii]['adjective']
			 							+ " " + $scope.currPlants[iii]['specName']),
							'plantClass': ("glyphicon nsBright glyphicon-grain")
						};
						$scope.gridPlants.push(this.seedGrid);
						this.seedGrid = {
							'plantName': ($scope.currPlants[iii]['adjective']
			 							+ " " + $scope.currPlants[iii]['specName']),
							'plantClass': ("glyphicon nsBright glyphicon-tree-deciduous")
						}
					}
					// Grid unit for seed
					else if ($scope.currPlants[iii]['numSeeds'] > 0) {
						this.seedGrid = {
							'plantName': ($scope.currPlants[iii]['adjective']
			 							+ " " + $scope.currPlants[iii]['specName']),
							'plantClass': ("glyphicon nsBright glyphicon-grain")
						};
					}
					// Grid unit for cutting
					else if ($scope.currPlants[iii]['numCuttings'] > 0) {
						this.seedGrid = {
							'plantName': ($scope.currPlants[iii]['adjective']
			 							+ " " + $scope.currPlants[iii]['specName']),
							'plantClass': ("glyphicon nsBright glyphicon-tree-deciduous")
						}
					}
					// Grid unit for a present genotype, but used up seeds and cuttings
					else {
						this.seedGrid = {
							'plantName': "",
							'plantClass': ("empty")
						};
					}
				}
				// Fill in remaining 96 spots
				else {
					this.seedGrid = {
						'plantName': "",
						'plantClass': ("empty")
					};
				}
				$scope.gridPlants.push(this.seedGrid);
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
					this.pollenGrid = {
						'plantName': ($scope.currPlants[iii]['adjective']
		 							+ " " + $scope.currPlants[iii]['specName']),
						'plantClass': ("glyphicon nsBright glyphicon-certificate")
					};
				}
				else {
					this.pollenGrid = {
						'plantName': "",
						'plantClass': ("empty")
					};
				}
				$scope.gridPlants.push(this.pollenGrid);
			}
		});
	}]);