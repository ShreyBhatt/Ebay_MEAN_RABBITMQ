var lastlogin = angular.module('lastlogin', []);
lastlogin.controller('lastlogin_controller', function($scope, $http) {

    $http({
        method : "GET",
        url : "/lastlogin",
        data: {
            "lastlogin": $scope.lastlogin,



        }
    })
        .then(function success(data){
                console.log(data);
                $scope.lastlogin = data.lastlogin

            },
            function error(err){
                console.log(err);
            })
});