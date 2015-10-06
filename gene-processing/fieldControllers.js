var fieldControllers = angular.module('fieldControllers', []);

fieldControllers.controller('ScaffoldCtrl', ['$scope', 'plantService', '$window',
	function($scope, plantService, $window) {

		// Pull plant data from plantService
		$scope.currPlants = [];
		plantService.getPlants().then(function(returnValues){
			$scope.currPlants = returnValues.data;
		
			$scope.fields = [];
			for (var iii=0; iii<4; iii++) {
				this.fieldTemplate = {
					'spot': iii,
					'planted': iii,
					'quality': 5,
					'plantName': ($scope.currPlants[iii]['adjective']
											+ " " + $scope.currPlants[iii]['specName'])
				}
				$scope.fields.push(this.fieldTemplate);
			};

			function DrawPlant(spot) {
				// Initialize canvas image objects
				var nsBackground = new Image();
				nsBackground.src = "img/field-space.png";

				nsBackground.onload = function() {
					var eleCanvas = $window.document.getElementsByClassName("plantCanvas")[spot];
					var pCanvas = eleCanvas.getContext('2d');
					pCanvas.drawImage(nsBackground, (120*(spot+1)), 70, 160, 280, 0, 0, 160, 280);
				}
			}

			for (var iii=0; iii<4; iii++) {
				DrawPlant(iii);
			}

		});
	}]);