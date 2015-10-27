var accountControllers = angular.module('accountControllers', ['ui.bootstrap']);

accountControllers.controller('LoginCtrl', 
	['globalService', '$scope', '$uibModal',
function(globalService, $scope, $uibModal) {

	// Pull available users from global data
	globalService.getGlobals().then(function(returnValues) {
		$scope.users = returnValues.data;
		$scope.usernames = [];
		for (var iii=0; iii<$scope.users.length; iii++) {
			this.username = $scope.users[iii].username;
			$scope.usernames.push(this.username);
		};

		$scope.modalOpen = function() {

			console.log("Usernames: " + $scope.usernames);
			var modalInstance = $uibModal.open({
				templateUrl: 'loginModalContent.html',
				controller: 'LoginContentCtrl',
				size: 'lg',
				backdrop: 'static',
				resolve: {
					usernames: function() {
						return $scope.usernames;
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
	['$scope', '$uibModalInstance', 'usernames', 
function($scope, $uibModalInstance, usernames) {

	$scope.usernames = usernames;
	$scope.usernames.sort();
	$scope.selected = {
		username: $scope.usernames[0]
	};

	$scope.ok = function() {
		$uibModalInstance.close($scope.selected.username);
	};

	// $scope.cancel = function() {
	// 	$uibModalInstance.dismiss('cancel');
	// }
}]);