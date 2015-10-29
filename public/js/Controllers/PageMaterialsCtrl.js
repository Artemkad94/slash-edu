PagesControllers.controller('MaterialsCtrl', ['$scope', '$http',
    function($scope, $http) {
        $scope.materials = [];
        $scope.pages = [];
        $scope.currentPage = 0;
        $scope.itemsPerPage = 10;
        $scope.numberMaterial = 0;
        $scope.materialGroups = [];

        $scope.setCurrentPage = function(val) {$scope.currentPage = val;};
        $scope.incCurrentPage = function()  {
            if($scope.currentPage < $scope.materials.length / $scope.itemsPerPage - 1 ){
                $scope.currentPage++; $scope.numberMaterial+=$scope.itemsPerPage;}
        };

        $scope.decCurrentPage = function() {
            if($scope.currentPage > 0 ){
                $scope.currentPage--; $scope.numberMaterial-=$scope.itemsPerPage;}
        };

        $http.get('/api/materials')
            .then(function(response){
                $scope.materials = response.data;

                $scope.pages = [];
                for(var i = 0; i < $scope.materials.length / $scope.itemsPerPage; i++) $scope.pages.push(i);
            });
        $http.get('/api/materialGroups')
            .then(function(response){
                $scope.materialGroups = response.data;
            });

        $scope.createGroup  = function () {
             $http.put('/api/materialGroups', {
             name: $scope.name,
             parent: null
             }).then(function (response) {
             $location.path('/materialGroups');
             });
        }
    }
]);