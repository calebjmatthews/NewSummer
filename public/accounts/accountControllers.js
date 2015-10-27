var accountControllers = angular.module('accountControllers', []);

accountControllers.controller('LoginCtrl', 
	['globalService', '$scope', '$uiModal',
	function(globalService, $scope, $uiModal) {

		// Pull available users from global data
		globalService.getGlobals().then(function(returnValues) {
			$scope.users = returnValues.data;
			$scope.usernames = [];
			for (var iii=0; iii<$scope.users.length; iii++) {
				this.username = $scope.users[iii].username;
				$scope.usernames.push(this.username);
			};
			console.log($scope.usernames);

			$scope.open = function() {

				var modalInstance = $uiModal.open({
					templateUrl: 'text/loginModalContent.html',
					controller: 'LoginContentCtrl',
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
			
		});
}]);

accountControllers.controller('LoginContentCtrl', 
	['$scope', '$uibModalInstance', 'usernames', 
	function($scope, $uibModalInstance, usernames) {

		$scope.usernames = usernames;
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