'use strict';

var app = angular.module('myApp');
app.controller('coursesCtrl', ['$scope', '$location', '$rootScope', '$http', "$state",'LoginService', function ($scope, $location, $rootScope, $http, $state,LoginService) {
    $scope.user=LoginService.getUser();
    $rootScope.user=$scope.user;
    if(!$scope.user)
        $state.go('login');




}]);
