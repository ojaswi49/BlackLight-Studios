app.controller("ctrl1", function($scope, $http) {
    $scope.leaderboard = [];
    $http.get("http://localhost:8000/get-leaderboard")
    .then(function(response){
      $scope.leaderboard = response.data.result;
    });
  })