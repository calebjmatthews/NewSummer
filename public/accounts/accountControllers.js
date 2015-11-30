var accountControllers = angular.module('accountControllers', ['ui.bootstrap']);

accountControllers.controller('LoginCtrl', 
	['globalService', '$scope', '$uibModal',
function(globalService, $scope, $uibModal) {

	// Pull available users from global data
	globalService.pullAllUsers().then(function(returnValues) {
		$scope.nsUsers = returnValues.data;

		$scope.modalOpen = function() {

			var modalInstance = $uibModal.open({
				templateUrl: 'loginModalContent.html',
				controller: 'LoginContentCtrl',
				size: 'lg',
				backdrop: 'static',
				resolve: {
					getUsers: function() {
						return $scope.nsUsers;
					}
				}
			});

			modalInstance.result.then(function(returnedUser) {
				$scope.nsEnteredUser = returnedUser;
			}, function() {
				console.log('Modal dismissed at: ' + new Date());
			});
		};

		$scope.modalOpen();

	});
}]);

accountControllers.controller('LoginContentCtrl', 
	['$scope', '$uibModalInstance', 'getUsers', 'globalService', 'plantService', 
function($scope, $uibModalInstance, getUsers, globalService, plantService) {

	$scope.nsUsers = getUsers;
	$scope.nsMessage = "Things are normal.";

	$scope.newUser = function() {
		// Initialize user global values
		var newGlobals = {
			'username': $scope.nsEnteredUser,
			'beganDate': Date.now,
			'money': 330,
			'fields': [{
				'planted': 0,
				'quality': 5
			}, {
				'planted': 0,
				'quality': 5
			}, {
				'planted': 0,
				'quality': 5
			}, {
				'planted': 0,
				'quality': 5
			}]
		}
		globalService.postUser(newGlobals);
		globalService.updateGlobals(newGlobals);
		console.log("Money is: " + globalService.getGlobals()['money']);
		$uibModalInstance.close();
	}

	$scope.ok = function() {
		var userMatch = -1;
		for (var iii=0; iii<$scope.nsUsers.length; iii++) {	
			if ($scope.nsEnteredUser === $scope.nsUsers[iii].username) {
				userMatch = iii;
			}
			else {
				$scope.nsMessage = "Username not found."
			}
		}

		if (userMatch != -1) {
			// Pull global variables and plant array from database
			globalService.updateGlobals($scope.nsUsers[userMatch]);
			$uibModalInstance.close();
		}
	};

	// $scope.cancel = function() {
	// 	$uibModalInstance.dismiss('cancel');
	// }
}]);