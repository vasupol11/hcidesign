angular.module('CourseScheduler')
.controller('LoginController', function ($scope, $state, sessionService) {
  $scope.authenticate = function () {
    console.log($scope.username)
    if($scope.username == '5610546788'){
      sessionService.set('5610546788',1)
      $state.go('home')
    }
    else{
      $scope.msg = 'username: 5610546788'
    }
  }
  $scope.test = function () {
    console.log($scope.username)
    if($scope.username == '5610546788'){
      sessionService.set('5610546788',1)
      $state.go('test')
    }
    else{
      $scope.msg = 'username: test'
    }
  }

})
.controller('LogoutController', function ($scope, $state, sessionService) {
  $scope.logout = function () {
    sessionService.remove('5610546788')
    $state.go('login')
  }
})
.controller('ProfileController', function ($scope, $state, sessionService) {
  $scope.profile = function () {
    $state.go('home')
  }
})
.controller('RegisterController', function ($scope, $state, sessionService) {
  $scope.regis = function () {
    $state.go('test')
  }
})
.controller('ReportController', function ($scope, $state, sessionService) {
  $scope.report = function () {
    $state.go('report')
  }
})
.factory("sessionService", ['$http', function($http) {
  return{
    set:function(key,value){
      return sessionStorage.setItem(key,value)
    },
    get:function(key){
      return sessionStorage.getItem(key)
    },
    remove:function(key){
      return sessionStorage.removeItem(key)
    },
  };

}])












