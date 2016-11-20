var profile = angular.module('profile', []);
profile.controller('profile_controller', function($scope, $http) {

    $http({
        method : "GET",
        url : '/ProfilePage',
        data: {
            "username": $scope.username,
            "email": $scope.email,
            "password": $scope.password,
            "birthdate": $scope.birthdate,
            "location": $scope.location,
            "contact": $scope.contact,


        }
    })
        .then(function success(data){
                console.log(data);
                $scope.profile = data.data;
            },
            function error(err){
                console.log(err);
            })
});