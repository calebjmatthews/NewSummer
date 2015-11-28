var gridControllers = angular.module('gridControllers', []);

gridControllers.controller('SeedGridCtrl', ['$scope', 'plantService', 'globalService',
	function($scope, plantService, globalService) {

		// Pull plant data from plantService
		$scope.myPlants = [];
		$scope.gridPlants = [];
		plantService.getTemplates().then(function(returnValues) {
			$scope.myPlants = returnValues.data['templates'];

			// Fill grid spaces with seeds/cuttings
			for (var iii=0; iii<$scope.myPlants.length; iii++) {
				// If the genotype has both a seed and a cutting, make a grid unit for each
				if (($scope.myPlants[iii]['numSeeds'] > 0)
				 && ($scope.myPlants[iii]['numCuttings'] > 0)) {
					this.seedGrid = {
						'plantName': ($scope.myPlants[iii]['adjective']
		 							+ " " + $scope.myPlants[iii]['specName']),
						'plantClass': ("glyphicon nsBright glyphicon-grain")
					};
					$scope.gridPlants.push(this.seedGrid);
					this.seedGrid = {
						'plantName': ($scope.myPlants[iii]['adjective']
		 							+ " " + $scope.myPlants[iii]['specName']),
						'plantClass': ("glyphicon nsBright glyphicon-tree-deciduous")
					};
					$scope.gridPlants.push(this.seedGrid);
				}
				// Grid unit for seed
				else if ($scope.myPlants[iii]['numSeeds'] > 0) {
					this.seedGrid = {
						'plantName': ($scope.myPlants[iii]['adjective']
		 							+ " " + $scope.myPlants[iii]['specName']),
						'plantClass': ("glyphicon nsBright glyphicon-grain")
					};
					$scope.gridPlants.push(this.seedGrid);
				}
				// Grid unit for cutting
				else if ($scope.myPlants[iii]['numCuttings'] > 0) {
					this.seedGrid = {
						'plantName': ($scope.myPlants[iii]['adjective']
		 							+ " " + $scope.myPlants[iii]['specName']),
						'plantClass': ("glyphicon nsBright glyphicon-tree-deciduous")
					};
					$scope.gridPlants.push(this.seedGrid);
				}
			}
			// Fill in remaining 96 spots
			while ($scope.gridPlants.length < 96) {
				this.seedGrid = {
					'plantName': "",
					'plantClass': ("empty")
				};
				$scope.gridPlants.push(this.seedGrid);
			}
		});
	
	}]);

gridControllers.controller('PollenGridCtrl', ['$scope', 'plantService',
	function($scope, plantService) {

		// Pull plant data from plantService
		$scope.myPlants = [];
		$scope.gridPlants = [];
		plantService.getTemplates().then(function(returnValues){
			$scope.myPlants = returnValues.data;

			for (var iii=0; iii<96; iii++) {
				if ($scope.myPlants[iii] != undefined) {
					if ($scope.myPlants[iii].numPollen > 0) {
						this.pollenGrid = {
							'plantName': ($scope.myPlants[iii]['adjective']
			 							+ " " + $scope.myPlants[iii]['specName']),
							'plantClass': ("glyphicon nsBright glyphicon-certificate")
						};
					}
					else {
						this.pollenGrid = {
							'plantName': "",
							'plantClass': ("empty")
						};
					}
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