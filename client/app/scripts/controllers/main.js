'use strict';

/**
 * @ngdoc function
 * @name finansesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the finansesApp
 */
angular.module('finansesApp')
  .controller('MainCtrl', function ($scope, $http, $location, UserInfoService) {
      var currentUserInfo = UserInfoService.get();
      if (!currentUserInfo)
      {
         $location.path('/login');
         return;
      }

      $scope.modalControl = {};

      var headers = {
         'Authorization': 'Token token=' + currentUserInfo.token,
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
               var jsonTransactions = response.data;
               jsonTransactions.forEach(function(transaction){
                  var date = transaction.date;
                  var pattern = /(\d\d\d\d)-(\d\d)-(\d\d)/;
                  var results = pattern.exec(date)
                  if (results)
                     transaction.date = results[3] + '/' + results[2] + '/' + results[1];
               });

               $scope.transactions = response.data;
            },
            function errorCallback(response) {
               console.log(response);
            }
         );
      }

      $scope.$on("modalClose", function(){
         $scope.getTransactions()
      })

      $scope.destroyTransaction = function(transactionId){
         $http({
            method: 'DELETE',
            url: '/api/transactions/' + transactionId,
            headers : headers
         })
         .then(
            function successCallback(response) {
               $scope.getTransactions();
            },
            function errorCallback(response) {
               console.log(response);
               alert('asdasd');
            }
         );
      }

      $scope.editTransaction = function(transaction){
         $scope.modalControl.formData = {
            description : transaction.description,
            value : transaction.value,
            date : transaction.date,
            id : transaction.id
         }
         $scope.modalControl.open();
      }

      $scope.addTransaction = function(){
         $scope.modalControl.open();
      }

      $scope.modalControl.addTransaction = function() {
         var url;
         if ($scope.modalControl.formData.id > 0)
            url = '/api/transactions/edit/' + $scope.modalControl.formData.id;
         else
            url = '/api/transactions/create';

         $http({
            method: 'POST',
            url: url,
            headers : headers,
            data: { transaction : $scope.modalControl.formData }
         })
         .then(
            function successCallback(response) {
               $scope.modalControl.formData = {};
               $scope.modalControl.close();
            },
            function errorCallback(response) {
               console.log(response);
            }
         );
      };

      $scope.getTransactions();
  });
