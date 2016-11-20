var bid = angular.module('bid', []);
bid.controller('bid_controller', function($scope, $http) {

    $http({
        method : "GET",
        url : '/displaybid'
    })
        .then(function success(data){
               // console.log(data);
                $scope.bids = data.data;
            },
            function error(err){
                console.log(err);
            })
});

bid.controller('bid_controller1', function($scope, $http) {

    $http({
        method : "GET",
        url : '/displayallbid'
    })
        .then(function success(data){
                console.log(data);
                $scope.bids = data.data;
            },
            function error(err){
                console.log(err);
            })
});
/*

 $scope.lastlogin = function() {
 $http({
 method : "GET",
 url : '/lastlogin',
 data: {
 "lastlogin": $scope.lastlogin,
 }
 }).success(function(data) {
 //checking the response data for statusCode
 console.log(data);
 $scope.lastlogin = data.data;


 },
 function error(err){
 console.log(err);
 });
 };*/
