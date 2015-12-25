PagesControllers.controller('GoCourseCtrl', ['$scope', '$http', '$location', '$routeParams',
  function($scope,  $http, $location, $routeParams) {
    $scope.materialCourse = 'Awesome Course';

    $scope.materialCourse = [];
    $scope.clickmaterial = function(materialId){
      //userCourse.location()
      $location.path('/go/courseId/' + materialId);
    };

    $scope.courseId = $routeParams.courseId;
    $http.get('/api/courses/' + $scope.courseId)
        .then(function(res) {
          console.log(res.data)
          $scope.materialCourse = res.data.materials;
          console.log($scope.materialCourse = res.data.materials);
        });
  }
]);