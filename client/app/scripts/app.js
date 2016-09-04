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
    'angularFileUpload',
    'ui.bootstrap'
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
  })
  .filter('money', function(){
    return function(input, unit, decimalPlaces, decimalUnit) {
      var output = String(input);

      if (decimalPlaces)
      {
        var outputArray = output.split('');
        var spliced = outputArray.splice(outputArray.length-decimalPlaces);

        outputArray = outputArray.concat([decimalUnit]);
        outputArray = outputArray.concat(spliced);
        output = outputArray.join('');
      }

      if (unit)
        output = unit + output;
      else
        output = "$" + output;

      return output;
    }
  })
  .directive('rvgModal', function(){
    return {
      restrict: 'E',
      replace: true,
      templateUrl: function(elem, attr){
        return "/" + attr.templateUrl;
      },
      scope: {
        control: '='
      },
      link: function(scope, element, attrs) {
        scope.internalControl = scope.control || {};
        scope.opened = false;

        scope.internalControl.open = function() {
          scope.opened = true;
        }

        scope.internalControl.close = function(){
          scope.opened = false;
          scope.$emit('modalClose');
        }
      }
    }
  });
