angular.module('CourseScheduler')
.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /home
  $urlRouterProvider.otherwise("/login");
  //
  // Now set up the states
  $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: "src/view/login.tmpl"
    })
    .state('home', {
      url: "/home",
      templateUrl: "src/view/home.tmpl"
    })
    .state('test', {
      url: "/test",
      templateUrl: "src/view/test.tmpl"
    })
    .state('report', {
      url: "/report",
      templateUrl: "src/view/report.tmpl"
    })
})
.run(function($rootScope, $location, $state, sessionService){
  var permission = ['/home']


  $rootScope.$on('$locationChangeStart', function(){
    if(!sessionService.get('5610546788') && permission.indexOf($location.path()) != -1) {
      $state.go('login')
    }
    if(sessionService.get('5610546788') && $location.path()=='/login'){
      console.log("home")
      $state.go('home')
    }
  })
})