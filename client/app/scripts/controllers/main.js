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
      var headers = {
         'Authorization': 'Token token=secret',
         'Accept': 'application/json;odata=verbose'
       };

      $scope.getTransactions = function(){
         $http({
            method: 'GET',
            url: '/api/transactions',
            headers : headers
         })
         .then(
            function successCallback(response) {
               $scope.transactions = response.data;
            },
            function errorCallback(response) {
               console.log(response);
            }
         );
      }

      $scope.destroyTransaction = function(transactionId){
         $http({
            method: 'DELETE',
            url: '/api/transactions/' + transactionId,
            headers : headers
         })
         .then(
            function successCallback(response) {
               console.log(response);
               alert('asdasd');
               $scope.getTransactions();
            },
            function errorCallback(response) {
               console.log(response);
               alert('asdasd');
            }
         );
      }

      $scope.addTransaction = function() {
         $http({
            method: 'POST',
            url: '/api/transactions/create',
            headers : headers,
            data: { transaction : $scope.formData }
         })
         .then(
            function successCallback(response) {
               $scope.formData = {};
               $scope.getTransactions()
            },
            function errorCallback(response) {
               console.log(response);
            }
         );
      };

      $scope.getTransactions();
  });
