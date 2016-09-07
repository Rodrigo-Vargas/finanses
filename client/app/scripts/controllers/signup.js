'use strict';

/**
 * @ngdoc function
 * @name finansesApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the finansesApp
 */
angular.module('finansesApp')
  .controller('SignupCtrl', function ($scope, $http, $location, UserInfoService) {
    $scope.submit = function(){
      $http({
        method: 'POST',
        url: '/api/users',
        data : $scope.formData
      })
      .then(function success(response){
        UserInfoService.set({ token : response.data.token });
        $location.path('/transactions');
      },
      function error(response){
        console.log(response);
      });
    }
  });
