PagesControllers.controller('MaterialEditCtrl',
  ['$scope', '$http', '$location', '$routeParams', '$sce',
  function($scope, $http, $location, $routeParams, $sce) {
    $scope.name = '';
    $scope.type = 'text';
    $scope.src = '';
    $scope.html = '';

    $scope.materialId = $routeParams.materialId;

    if ($scope.materialId !== 'new') {
      $http.get('/api/materials/' + $scope.materialId)
        .then(function(res) {
          $scope.name = res.data.name;
          $scope.type = res.data.type;
          $scope.src = res.data.data.src;
          $scope.editor.setValue($scope.src);
        });

    }

    $scope.preview = function() {
      $scope.src = $scope.editor.getValue();
      $http.post('/api/materials/preview', {src: $scope.src})
        .then(function(response) {
          $scope.html = $sce.trustAsHtml(response.data);

          setTimeout(function() {
            for (var i = 0; i < document.scripts.length; i++) {
              if (document.scripts[i].type.indexOf('math/tex') >= 0) {
                MathJax.Hub.Queue([
                  'Typeset',
                  MathJax.Hub, document.scripts[i]
                ]);
              }
            }
            $('pre code').each(function(i, block) {
              hljs.highlightBlock(block);
            });
          }, 500);
        });
    };

    $scope.add = function() {
      $scope.src = $scope.editor.getValue();

      $http.put('/api/materials', {
        name: $scope.name,
        type: $scope.type,
        src: $scope.src
      }).then(function() {
        $location.path('/materials');
      });
    };

    $scope.update = function() {
      $scope.src = $scope.editor.getValue();
      $http.post('/api/materials/' + $scope.materialId, {
        name: $scope.name,
        type: $scope.type,
        src: $scope.src
      }).then(function() {
        $location.path('/materials');
      });
    };

    $scope.del = function() {
      $scope.src = $scope.editor.getValue();
      $http.delete('/api/materials/' + $scope.materialId)
        .then(function() {
          $location.path('/materials');
        });
    };

    $('#myTab').find('a').click(function(e) {
      e.preventDefault();
      $(this).tab('show');
    });

    $scope.editor = ace.edit('editor');
    $scope.editor.getSession().setMode('ace/mode/markdown');
  }
]);