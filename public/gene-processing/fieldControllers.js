var fieldControllers = angular.module('fieldControllers', []);

fieldControllers.controller('ScaffoldCtrl', 
	['$scope', 'plantService', '$window', '$interval',
	function($scope, plantService, $window, $interval) {

		// Pull plant data from plantService
		$scope.myPlants = [];
		plantService.getPlants().then(function(returnValues){
			$scope.myPlants = returnValues.data;
		
			// Set the initial state for fields
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
				var poaBaseA   = new Image(); poaBaseA.src = "img/poa-basea.png";
				var poaBaseB   = new Image(); poaBaseB.src = "img/poa-baseb.png";
				var poaStem1A  = new Image(); poaStem1A.src = "img/poa-stem1a.png";
				var poaStem1B  = new Image(); poaStem1B.src = "img/poa-stem1b.png";
				var poaStem2A  = new Image(); poaStem2A.src = "img/poa-stem2a.png";
				var poaStem2B  = new Image(); poaStem2B.src = "img/poa-stem2b.png";
				var poaStem3A  = new Image(); poaStem3A.src = "img/poa-stem3a.png";
				var poaStem3B  = new Image(); poaStem3B.src = "img/poa-stem3b.png";
				var poaPenultA = new Image(); poaPenultA.src = "img/poa-penulta.png";
				var poaPenultB = new Image(); poaPenultB.src = "img/poa-penultb.png";
				var poaCrownA  = new Image(); poaCrownA.src = "img/poa-crowna.png";
				var poaCrownB  = new Image(); poaCrownB.src = "img/poa-crownb.png";

				var nsBackground = new Image(); nsBackground.src = "img/field-space.png";

				var ysum = 260; // ysum keeps track of the current position of the highest point
				var xanc = 80; // xanc is the horizontal anchor point for the canvas
				// anc is an array of anchor points for the plant pieces
				var anc = [[60, 18], [81, 18], [66, 45], [60, 45], [76, 50], [84, 50],
									 [66, 38], [69, 38], [34, 44], [68, 44], [65, 84], [75, 84]];

				nsBackground.onload = function() {
					var eleCanvas = $window.document.getElementsByClassName("plantCanvas")[spot];
					var pCanvas = eleCanvas.getContext('2d');
					pCanvas.drawImage(nsBackground, (120*(spot+1)), 70, 160, 280, 0, 0, 160, 280);
					if (Math.random() > .5) {
						pCanvas.drawImage(poaBaseA, (xanc-anc[0][0]), (ysum-anc[0][1]));
						ysum -= anc[0][1];
					}
					else {
						pCanvas.drawImage(poaBaseB, (xanc-anc[1][0]), (ysum-anc[1][1]));
						ysum -= anc[1][1];
					}
					var heightSum = ((GeneCheck($scope.fields[spot]["planted"], "PS1"))
												 + (GeneCheck($scope.fields[spot]["planted"], "PS2")));
					if (heightSum > 0)
						if (Math.random() > .5) {
							pCanvas.drawImage(poaStem1A, (xanc-anc[2][0]), (ysum-anc[2][1]));
							ysum -= anc[2][1];
						}
						else {
							pCanvas.drawImage(poaStem1B, (xanc-anc[3][0]), (ysum-anc[3][1]));
							ysum -= anc[3][1];
						}			
					if (heightSum > 1) {
						if (Math.random() > .5) {
							pCanvas.drawImage(poaStem2A, (xanc-anc[4][0]), (ysum-anc[4][1]));
							ysum -= anc[4][1];
						}
						else {
							pCanvas.drawImage(poaStem2B, (xanc-anc[5][0]), (ysum-anc[5][1]));
							ysum -= anc[5][1];
						}
					}
					if (heightSum > 2) {
						if (Math.random() > .5) {
							pCanvas.drawImage(poaStem3A, (xanc-anc[6][0]), (ysum-anc[6][1]));
							ysum -= anc[6][1];
						}
						else {
							pCanvas.drawImage(poaStem3B, (xanc-anc[7][0]), (ysum-anc[7][1]));
							ysum -= anc[7][1];
						}
					}
					if (Math.random() > .5) {
						pCanvas.drawImage(poaPenultA, (xanc-anc[8][0]), (ysum-anc[8][1]));
						ysum -= anc[8][1];
					}
					else {
						pCanvas.drawImage(poaPenultB, (xanc-anc[9][0]), (ysum-anc[9][1]));
						ysum -= anc[9][1];
					}
					if (Math.random() > .5) {
						pCanvas.drawImage(poaCrownA, (xanc-anc[10][0]), (ysum-anc[10][1]));
						ysum -= anc[10][1];
					}
					else {
						pCanvas.drawImage(poaCrownB, (xanc-anc[11][0]), (ysum-anc[11][1]));
						ysum -= anc[11][1];
					}
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

			function GeneCheck(plantID, geneName) {
				if (($scope.myPlants[plantID][geneName][0] === true)
				 && ($scope.myPlants[plantID][geneName][1] === true)) {
					return 2;
				}
				else if ((($scope.myPlants[plantID][geneName][0] === true)
			      	 && ($scope.myPlants[plantID][geneName][1] === false))
			       || ((($scope.myPlants[plantID][geneName][0] === false)
				       && ($scope.myPlants[plantID][geneName][1] === true)))) {
					return 1;
				}
				else if (($scope.myPlants[plantID][geneName][0] === false)
				 			&& ($scope.myPlants[plantID][geneName][1] === false)) {
					return 0;
				}
				else {
					return "error";
				}
			}
		});
	}]);