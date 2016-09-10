'use strict';

/**
 * @ngdoc function
 * @name finansesApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the finansesApp
 */
angular.module('finansesApp')
  .controller('LoginCtrl', function ($scope, $http, $location, UserInfoService) {
    var currentUserInfo = UserInfoService.get();
    if (currentUserInfo)
    {
      $location.path('/');
      return;
    }    
    $scope.submit = function(){
      $http(
      {
        method: 'POST',
        url: '/api/users/login',
        data : { user : $scope.formData }
      })
      .then(function success(response){
        if (response.data.success)
        {
          UserInfoService.set({ token : response.data.token });
          $location.path('/');
        }
        else
        {
          alert('Credenciais incorretas');
        }
      });
    }
  });
