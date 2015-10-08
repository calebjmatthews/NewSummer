var fieldControllers = angular.module('fieldControllers', []);

fieldControllers.controller('ScaffoldCtrl', ['$scope', 'plantService', '$window', '$interval',
	function($scope, plantService, $window, $interval) {

		// Pull plant data from plantService
		this.allPlants = [];
		$scope.myPlants = [];
		plantService.getPlants().then(function(returnValues){
			this.allPlants = returnValues.data;
			// Select only plants that fit the current username
			for (var iii=0; iii < this.allPlants.length; iii++) {
				if (this.allPlants[iii]["owner"] === "Demeter") {
					$scope.myPlants.push(this.allPlants[iii]);
				}
			}
		
			$scope.fields = [];
			for (var iii=0; iii<4; iii++) {
				this.fieldTemplate = {
					'spot': iii,
					'planted': (iii + 4),
					'quality': 5,
					'plantName': ($scope.myPlants[iii]['adjective']
											+ " " + $scope.myPlants[iii]['specName'])
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

			PassTime = $interval(function() {
				for (var iii=0; iii<4; iii++) {
					console.log();
					if ($scope.myPlants[$scope.fields[iii]["planted"]]["progress"] < 100) {
						$scope.myPlants[$scope.fields[iii]["planted"]]["progress"] += 1;
					}
					else {
						$interval.cancel(PassTime);
					}
				}
			}, 500);

			for (var iii=0; iii<4; iii++) {
				DrawPlant(iii);
			}

		});
	}]);