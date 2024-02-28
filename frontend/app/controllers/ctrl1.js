app.controller("ctrl1", function($scope, $http) {
    $scope.leaderboard = [];
    $http.get("https://blacklight-studios-xv3w.onrender.com/get-leaderboard")
    .then(function(response){
      $scope.leaderboard = response.data.result;
    });
  })