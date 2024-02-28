app.controller("ctrl2",  function($scope, $http) {
    $scope.country = "";
    $scope.countryData = [];
    $scope.leaderboard = [];
    $scope.showModal = false;
    $scope.getCountryData = function() {
      $http.post("https://blacklight-studios-xv3w.onrender.com/leaderboard-by-country", { country: $scope.country } )
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