'use strict';

/**
 * @ngdoc overview
 * @name finansesApp
 * @description
 * # finansesApp
 *
 * Main module of the application.
 */
angular
  .module('finansesApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angularFileUpload'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/importadores', {
        templateUrl: 'views/importers.html',
        controller: 'ImportersCtrl',
        controllerAs: 'importers'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
