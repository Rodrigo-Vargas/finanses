'use strict';

/**
 * @ngdoc function
 * @name finansesApp.controller:ImportersCtrl
 * @description
 * # ImportersCtrl
 * Controller of the finansesApp
 */
angular.module('finansesApp')
  .controller('ImportersCtrl', function ($scope, $http, FileUploader) {
      var uploader = $scope.uploader = new FileUploader({
         url: '/api/upload'
      });

      var headers = {
         'Authorization': 'Token token=secret',
         'Accept': 'application/json;odata=verbose'
      };

      $scope.importItem = function(transaction, index){
         $http({
            method: 'POST',
            url: '/api/transactions/create',
            headers : headers,
            data: { transaction : transaction }
         })
         .then(
            function successCallback(response) {
               $scope.importedTransactions.splice(index, 1);
            },
            function errorCallback(response) {
               console.log(response);
            }
         );
      }

      $scope.removeItem = function(index){
         $scope.importedTransactions.splice(index, 1);
      }

      uploader.onBeforeUploadItem = function(item) {
         item.headers = headers;
      };
      uploader.onCompleteItem = function(fileItem, response, status, headers) {
         $scope.importedTransactions = response;
      };
  });
