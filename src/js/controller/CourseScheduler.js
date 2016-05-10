
angular.module("CourseScheduler", ['ui.router','ngMaterial'])
.controller('showCourseTable',function ($rootScope,$http,$scope,CourseService,InformationService,InformationStorage, RegisCoursesStorage) {
  CourseService.getResponders.then(function(data){
    $scope.course = data;
    $scope.status = 'not enrolled'
  })
  $(function () {$('[data-toggle="tooltip"]').tooltip()})
  function cancelDiv() {
    $("#alert").hide();
  }

  function ShowDiv() {
    $("#alert").show();
    setTimeout(function(){$("#alert").hide()}, 3000)
  }
  function ShowDiv2() {
    $("#alert").show();
  }
  $(function () { 
    $("#alert").hide();          
  });
  var calculateCredit = function(){
      console.log(RegisCoursesStorage.getProducts())
      var courses = RegisCoursesStorage.getProducts()
      var sum = 0
      courses.forEach(function(course){
        sum+=course.credit.total
      })
      return sum
  }
  // $scope.totalcredit = RegisCoursesStorage.getCredit()
  $scope.totalcredit = calculateCredit()
  $scope.regis = RegisCoursesStorage.getProducts()
  $scope.name = InformationStorage.info
  $scope.showCourseInformation = function (course) {
    InformationService.getCoursesInfo(course.id).then(function(data){
      $scope.name.id = data.data.id
      $scope.name.name=data.data.name.en;
      $scope.name.description=data.data.description.en;
      $scope.name.lab=data.data.credit.lab;
      $scope.name.self=data.data.credit.self;
      $scope.name.lecture=data.data.credit.lecture;
      $scope.alert = 'You are selecting ' + data.data.name.en
    })
    ShowDiv2()
  }
  $scope.registerAlert = function(id){
    console.log(calculateCredit())
    var name = 'You are about to register for ' + InformationStorage.info.name
    // var inputStorage = []
    
    var confirmed = function(){
      InformationService.getCoursesInfo(id).then(function(data){
        RegisCoursesStorage.addProduct(data.data)
        console.log(data)
        $scope.alert = 'You have successfully registered'
        ShowDiv()
        $scope.totalcredit = calculateCredit()
      })
    }

    var cancelled = function(){
      $scope.alert = 'You have cancelled your registration'
                  ShowDiv()
    }

    if ($scope.totalcredit + InformationStorage.info.total <= 24) {
      if(InformationStorage.info.name){
        $scope.alert = ''
        if(RegisCoursesStorage.getProducts().map(function(e) { return e.id; }).indexOf(id) == -1){
          BootstrapDialog.confirm(
            {title:'Confirmation', 
            message:name, 
            callback: function(result) {
                // result will be true if button was click, while it will be false if users close the dialog directly.
                if(result) {
                  confirmed()
                }else {
                  cancelled()
                }
              } 
            }
            )
        }else{
          $scope.alert = 'You are already enrolled to this class!'
          ShowDiv()
        }
      }
      else{
        $scope.alert = 'Please select a course first'
        ShowDiv()
      }
    }else{
      $scope.alert = 'Your credit is overloaded!'
      ShowDiv()
    }
  }
  $scope.dropClass = function(id){
    var index = RegisCoursesStorage.getProducts().map(function(e) { return e.id; }).indexOf(id)
    var array = RegisCoursesStorage.getProducts()
    array.splice(index, 1);
  }
  $scope.toJSON = function(){
    BootstrapDialog.show({
      title: 'To JSON',
      message: JSON.stringify(RegisCoursesStorage.getProducts())
    });
  }
})
.factory("CourseService", ['$http', function($http) {
  return {
    getResponders: (function(response) {
     return $http.get("https://whsatku.github.io/skecourses/list.json")
     .then(function(response) {
      return response.data
    })
   })()
 }
}])
.factory("InformationService", ['$http', function($http) {
  var courseInfo = {};
  courseInfo.getCoursesInfo = function(courseNumber) {
    return $http.get('https://whsatku.github.io/skecourses/'+ courseNumber +'.json')
  }
  return courseInfo;
}])
.service('InformationStorage', function() {
 this.info = {id: '',name: '', lab:'', lecture:'', self:'', total:'', description:'', pre:''};
})
.service('RegisCoursesStorage', function() {
  var productList = [];
  var credit = 0;

  var addProduct = function(newObj) {
    productList.push(newObj);
  };

  var getCredit = function(){
    return credit;
  };

  var getProducts = function(){
    return productList;
  };

  return {
    addProduct: addProduct,
    getProducts: getProducts,
    getCredit: getCredit,
  };


})
// .factory("clickOnTableRow",  function() {

// })
//https://whsatku.github.io/skecourses/sections/01219498.json