var productdetail = angular.module('productdetail', []);
productdetail.controller('productdetail_controller', function($scope, $http)
{
    $scope.addcart = function(req,res){
        console.log($scope.productname);
        $http({
            method:'post',
            url:'/addcart',

            data:{
                "productname":$scope.productname,
                "price":$scope.price,
                "quantity":$scope.quantity,
            }
        }).success(function(data){
            //console.log(data);

        }).error(function(error) {
            console.log("error");
        })

    }

    $scope.productdetail=function(req, res){

        console.log("in productdetail angular");
        $http({
            method:'post',
            url:'/productdetail'

        }).success(function(data){
            console.log("getting product detail on product detail page");
            $scope.productdetail = data;
        })
    }


});