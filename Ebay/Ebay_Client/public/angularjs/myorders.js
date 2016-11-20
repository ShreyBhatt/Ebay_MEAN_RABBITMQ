var order = angular.module('myorders', []);
order.controller('myorders_controller', function($scope, $http) {

    $http({
        method : "GET",
        url : '/displayorders'
    })
        .then(function success(data){
                console.log(data);
                console.log("Display Orders angular");

                $scope.orders = data.data;
            },
            function error(err){
                console.log(err);
            })
});