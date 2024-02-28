app.controller("ctrl2",  function($scope, $http) {
    $scope.country = "";
    $scope.countryData = [];
    $scope.defaultBoard = [];
    $scope.leaderboard = [];
    $scope.showModal = false;
    $http.get("http://localhost:8000/get-leaderboard")
    .then(function(response){
      $scope.leaderboard = response.data.result;
    });
    $scope.getCountryData = function() {
      $http.post("http://localhost:8000/leaderboard-by-country", { country: $scope.country } )
        .then(function(response) {
          $scope.countryData = response.data.leaderboard;
          $scope.showModal = true;
        })
        .catch(function(error) {
          console.error('Error:', error);
        });
        document.getElementById('myModal').style.display = 'block';
      };
    $scope.closeModal = function() {
      $scope.showModal = false;
    };
  });