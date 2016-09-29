angular
  .module('app.services', ['ngCookies'])
  .factory('UserInfoService', ['$cookies', function($cookies) {
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
        userInfo = null;
        $cookies.remove('userInfo');
      }
    };
  }]);
