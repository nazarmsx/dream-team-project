
'use strict';

var myApp = angular.module('myApp', ['ui.router']);


myApp.run([
  '$rootScope','$state','LoginService',function ($rootScope,$state,LoginService){
    // console.log('sds');
    $rootScope.logout=function()
    {

      $state.go('login');
      LoginService.logOut();
    };
    $rootScope.courses=[{
      id:1,
      name:"Нереляційні бази даних",
      description:"Курс передбачає ознайомлення з сучасним станом розробки нереляційних " +
      "підходів до організації баз даних.",
      credits:5,
      univer_id:"naukma"
    },
      {        id:2,
        name:"Моделі паралельного програмування",
        description:"Курс присвячено актуальним методам та технологіям в області паралельного програмування.",
        credits:3,
        univer_id:"knu"

      }];
    $rootScope.universities=[{
      id:"naukma",
      name:"Національний університет «Києво-Могилянська академія»",
      address:"вулиця Григорія Сковороди, 2, Київ, 04655",
      img:"http://static.espreso.tv/uploads/article/219913/images/im578x383-b126b33-759_441-shutterstock-138054572.jpg"
    },{
      id:"knu",
      name:"Київський національний університет імені Тараса Шевченка",
      address:" вулиця Володимирська, 60, Київ, 01033",
      img:"https://upload.wikimedia.org/wikipedia/ru/b/bc/GerbKievUniversity.jpg"
    },
      {
        id:"kpi",
        name:"Національний технічний університет України «Київський політехнічний інститут імені Ігоря Сікорського»",
        address:"просп. Перемоги, 37, Київ, 03056",
        img:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/NTUU_KPI_logo.png/200px-NTUU_KPI_logo.png"
      }];

    $rootScope.userCourses=[
      {
        course_id:1,
        status:1,
        mark:95
      },
      {
        course_id:2,
        status:2
      }
    ];

    $rootScope.mapCourses=function(data)
    {
      var res=[];
      for(var i=0;i<data.length;++i)
      {
        var temp=clone(data[i]);
        console.log(temp);
        for(var j=0;j<$rootScope.courses.length;++j){
          if(temp.course_id==$rootScope.courses[j].id)
          {
            temp.name=$rootScope.courses[j].name;
            temp.credits=$rootScope.courses[j].credits;
            for(var k=0;k<$rootScope.universities.length;++k) {
              if($rootScope.courses[j].univer_id==$rootScope.universities[j].id)
              {
                temp.univer_name=$rootScope.universities[j].name;
              }
            }
          }

        }

        res.push(temp)
      }
      console.log(res);
      return res;

    };
    $rootScope.viewCourses=$rootScope.mapCourses($rootScope.userCourses);


  }]);

myApp.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/courses");
  //
  // Now set up the states
  $stateProvider

    .state('login', {
      url: "/login",
      templateUrl: "partials/login.html",
      controller: 'loginCtrl'
    })
    .state('courses', {
      url: '/courses',
      abstract:false,
      templateUrl: 'partials/courses.html',
      controller: 'coursesCtrl'
    })
      .state('universities', {
        url: '/universities',
        abstract:false,
        templateUrl: 'partials/universities.html',
        controller: 'universitiesCtrl'
      })
      .state('profile', {
        url: '/profile',
        abstract:false,
        templateUrl: 'partials/profile.html',
        controller: 'profileCtrl'
      })




});



myApp.factory('LoginService', function() {

  var users=[
    {login:"root",
      password:"root",
    name:'John Smith'}
  ];

  var factory = {};
  factory.getUser=function(){
    var user=sessionStorage.getItem('user');
    if(user)
    return JSON.parse(user);
    else return null;
  };
  factory.findUser=function(user)
  {
    console.log(user);
    var res=null
    users.forEach(function(elem){
      console.log(user.login==elem.login && user.password==elem.password)
      if(user.login==elem.login && user.password==elem.password)
      {
        res=elem;
      }

    });

    return res;
  };


  factory.setUser=function(user)
  {
    sessionStorage.setItem('user',JSON.stringify(user));
  };
  factory.logOut=function()
  {
    sessionStorage.setItem('user',null);
  };
  return factory;
});

myApp.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});

function clone(obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}

