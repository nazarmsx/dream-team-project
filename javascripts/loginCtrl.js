'use strict';

var app = angular.module('myApp');
app. controller('loginCtrl', ['$scope','$location','$rootScope','$http',"$state" ,'LoginService',function($scope,$location,$rootScope,$http,$state,LoginService) {

    $scope.user={};

    $scope.login=function() {
        $scope.isRequestSent=true;

       var usr= LoginService.findUser($scope.user);
        console.log(usr)
        if (usr) {

            $scope.user = usr;
            LoginService.setUser($scope.user);
            $state.go('courses');
            $scope.isRequestSent=false;
        }
        else {
            $scope.loginError=true;
        }


    };



    $('#loginForm').on('keyup keypress', function(e) {
        var code = e.keyCode || e.which;

        if (code == 13) {

                if (!$scope.isRequestSent)
                {
                    $scope.login();
                }

            e.preventDefault();
            return false;
        }
    });

}]);
