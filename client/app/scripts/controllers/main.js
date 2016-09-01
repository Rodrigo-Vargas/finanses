'use strict';

/**
 * @ngdoc function
 * @name finansesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the finansesApp
 */
angular.module('finansesApp')
  .controller('MainCtrl', function ($scope, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.submit = function(){
    	$http({
	        method: 'GET',
	        url: '/api/transactions'
	    })
	    .then(
	        function successCallback(response) {
	          console.log(response);
	        },
	        function errorCallback(response) {
	          console.log(response);
	        }
	      );
    };
  });
