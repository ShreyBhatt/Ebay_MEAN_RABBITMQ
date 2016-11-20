//loading the 'login' angularJS module
var login = angular.module('login', []);
//defining the login controller
login.controller('login', function($scope, $http) {
	//Initializing the 'invalid_login' and 'unexpected_error' 
	//to be hidden in the UI by setting them true,
	//Note: They become visible when we set them to false
	$scope.invalid_email = true;
	$scope.invalid_username = true;
	$scope.submit = function() {
		$http({
			method : "POST",
			url : '/checkUsername',
			data : {
				"username1" : $scope.username1
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 200)
			{
				$scope.invalid_username = true;
			}
			else if (data.statusCode == 401)

				{
					$scope.invalid_username = false;

				}


		});
	};



	$scope.submitnew = function() {
		$http({
			method : "POST",
			url : '/checkEmail',
			data : {
				"email1" : $scope.email1
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 200)
			{
				$scope.invalid_email = true;
			}
			else if (data.statusCode == 401)

			{
				$scope.invalid_email = false;

			}


		});
	};
});
