'use strict';
angular.module('psJwtApp').config(function($urlRouterProvider, $stateProvider, $httpProvider ) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: '/views/main.html'
    })
    .state('jobs', {
      url: '/jobs',
      templateUrl: '/views/jobs.html',
      controller: 'JobsCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/views/register.html',
      controller: 'RegisterCtrl'
    })
    .state('logout', {
      url: '/logout', 
      controller: 'LogoutCtrl'
    });
    $httpProvider.interceptors.push('authinterceptor');
}).constant('API_URL','http://localhost:3000/');