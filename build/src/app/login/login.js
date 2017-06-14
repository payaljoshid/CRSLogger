
angular.module( 'ngBoilerplate.login', [
  'ui.router',
  'plusOne'
])


.config(function config( $stateProvider ) {
  $stateProvider.state( 'login', {
    url: '/login',
    views: {
      "main": {
        controller: 'LoginCtrl',
        templateUrl: 'login/login.tpl.html'
      }
    },
    data:{ pageTitle: 'Login' }
  });
})


.controller( 'LoginCtrl', function LoginCtrl( $scope, $state,$http, $rootScope, LoginService ) {

$scope.data = {
  "userName" : "",
  "password" : ""
};


  $rootScope.title = "AngularJS Login Sample";
    $scope.formSubmit = function() {
      // if(LoginService.login($scope.email, $scope.password)) {
      //   $scope.error = '';
      //   $scope.email = '';
      //   $scope.password = '';
      //   $state.go('dashboard');
      // } else {
      //   $scope.error = "Incorrect username/password !";
      // } 
$scope.data.userName = $scope.data.userName ? $scope.data.userName : null;
$scope.data.password = $scope.data.password ? $scope.data.password : null;
       var config = {
                headers : {
                    'Content-Type': 'application/json;',
                    'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjcnNEZXZlbG9wZXIiLCJleHAiOjE0OTgxMjg0MDl9.NUfZN1ByrN9UK6Rfg_7f_YEa0NWOgj7NB4aKpLhx4_deJpG3XX8B62qerMfwJZSeJGtpAeIXMAe7Pb_rZgKQew'
                }
            };


         $http.post('http://136.243.4.199:8280/login',  $scope.data, config)
        .success(function (data, status, headers, config,response) {
          console.log("success");
          console.log('Content-Range: ' + response.headers('Content-Range'));
            $scope.data1 = data;
            $state.go('dashboard');
        })
        .error(function (data,headers) {
           console.log("err");
           window.alert("INVALID USER NAME OR PASSWORD");

        });
    };  
})
.factory('LoginService', function() {
    var admin = "swathi@g.com";
    var pass = "123456";
    var isAuthenticated = false;
    
    return {
      login : function(email, password) {
        isAuthenticated = (email == admin && password == pass);
        return isAuthenticated;
      },
      isAuthenticated : function() {
        return isAuthenticated;
      }
    };
    
  });


