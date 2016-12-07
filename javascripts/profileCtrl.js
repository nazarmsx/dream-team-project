
'use strict';

var app = angular.module('myApp');
app. controller('profileCtrl', ['$scope','$location','$rootScope','$http',"$state",'LoginService' ,function($scope,$location,$rootScope,$http,$state,LoginService) {

    $scope.user=LoginService.getUser();
    $rootScope.user=$scope.user;
    if(!$scope.user)
        $state.go('login');

    $scope.statusMaper={
        1:"Прослухана",
        2:"Слухається",
        3:"Записаний"
    };
}]);
