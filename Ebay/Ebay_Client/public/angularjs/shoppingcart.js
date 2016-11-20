var getcart = angular.module('getcartapp', []);
getcart.controller('getcart',function($scope,$http){


    $scope.getcart = function(req, res){
        $scope.grandtotal="";
        $http({
            method:'post',
            url:'/getcart'
        }).success(function(data){
            console.log("getting products in angular");
            console.log(data);
            $scope.getcartitems = data;
            for(i=0; i<data.length; i++){
                $scope.grandtotal=$scope.grandtotal+data[i].total;
            }
        })
    }

    $scope.settotal = function(){
        var temp = 0;
        for(i=0; i<$scope.getcartitems.length; i++){
            temp=temp+($scope.getcartitems[i].quantityincart*$scope.getcartitems[i].price);
        }
        $scope.grandtotal=temp;
    }

    $scope.updatequantity = function(quantity,index){
        $scope.getcartitems[index].quantityincart = quantity;
        $scope.settotal();
    }

});


