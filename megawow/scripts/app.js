'use strict';

/**
 * @ngdoc overview
 * @name equationCalculator2App
 * @description
 * # equationCalculator2App
 *
 * Main module of the application.
 */
angular
  .module('equationCalculator2App', [
    'ngAnimate',
    // 'ngCookies',
    // 'ngResource',
    // 'ngTouch',
    'ngMessages',
    'ngRoute',
    'ngMaterial',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MyCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
