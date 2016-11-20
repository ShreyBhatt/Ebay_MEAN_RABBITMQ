var advertisement = angular.module('advertisement',[]);
advertisement.controller('advertisement_controller', function($scope, $http) {

    $http({
        method : "GET",
        url : '/displayadvertise'
    })
        .then(function success(data){
                console.log(data);
                $scope.advertisements = data.data;
            },
            function error(err){
                console.log(err);
            })
});

advertisement.controller('advertisement_controller1', function($scope, $http) {

    $http({
        method : "GET",
        url : '/displayalladvertise'
    })
        .then(function success(data){
                console.log(data);
                $scope.advertisements = data.data;
            },
            function error(err){
                console.log(err);
            })
});

