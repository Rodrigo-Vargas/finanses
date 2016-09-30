angular
  .module('finansesApp', [
    'app.services',
    'app.directives',
    'angularFileUpload'
  ])
  .controller('HeaderCtrl', ['$scope', '$window', 'UserInfoService', function($scope, $window, UserInfoService){
    $scope.currentUserInfo = UserInfoService.get();

    $scope.toogleMenu = function(){
      if (angular.element( document.querySelector( '.side-nav' ) ).hasClass('opened'))
        angular.element( document.querySelector( '.side-nav' ) ).removeClass('opened');  
      else
        angular.element( document.querySelector( '.side-nav' ) ).addClass('opened');      
    }

    $scope.logout = function(){
      UserInfoService.clear();
      $window.location.href = '/login';  
    }
  }]);