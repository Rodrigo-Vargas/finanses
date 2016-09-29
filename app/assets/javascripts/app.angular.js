angular
  .module('finansesApp', [
    'app.services',
    'app.directives',
    'angularFileUpload'
  ])
  .controller('HeaderCtrl', ['$scope', '$window', 'UserInfoService', function($scope, $window, UserInfoService){
    $scope.currentUserInfo = UserInfoService.get();

    $scope.logout = function(){
      UserInfoService.clear();
      $window.location.href = '/login';
  
    }
  }]);