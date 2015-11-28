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

			modalInstance.result.then(function(selectedItem) {
				$scope.selected = selectedItem;
			}, function() {
				console.log('Modal dismissed at: ' + new Date());
			});
		};

		$scope.modalOpen();

	});
}]);

accountControllers.controller('LoginContentCtrl', 
	['$scope', '$uibModalInstance', 'getUsers', 
function($scope, $uibModalInstance, getUsers) {

	$scope.nsUsers = getUsers;
	console.log("Users received: " + $scope.nsUsers.length);
	//$scope.users.username.sort();
	$scope.selected = {
		getUsers: $scope.nsUsers[0]
	};

	$scope.ok = function() {
		$uibModalInstance.close($scope.selected.nsUsers);
		console.log("Selected user: " + $scope.selected.nsUsers.username);

		// Pull global variables and plant array from database

	};

	// $scope.cancel = function() {
	// 	$uibModalInstance.dismiss('cancel');
	// }
}]);