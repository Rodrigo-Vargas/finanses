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
  .config(function ($routeProvider, $locationProvider) {
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
      .when('/categorias', {
        templateUrl: 'views/categories.html',
        controller: 'CategoriesCtrl',
        controllerAs: 'categories'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl', 
        controllerAs: 'signup'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl', 
        controllerAs: 'login'
      })
      .when('/logout', {
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl', 
        controllerAs: 'logout'
      })
      .otherwise({
        redirectTo: '/'
      });

      $locationProvider.html5Mode(true);
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
  .factory('UserInfoService', function($cookies) {
    var userInfo;

    return {
      get : function(){
        if (!userInfo)
        {
          if ($cookies.get('userInfo'))
            userInfo = JSON.parse($cookies.get('userInfo'));
        }

        return userInfo;
      },
      set : function(value){
        userInfo = value;

        var expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + 60);
        $cookies.put('userInfo', JSON.stringify(userInfo), {'expires' : expirationDate });
      },
      clear: function() {
        console.log('Clear!');
        userInfo = null;
        $cookies.remove('userInfo');
      }
    };
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
