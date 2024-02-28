app.controller("ctrl3", function ($scope,$http){
    $scope.name = "";
    $scope.getRank = function(){
      $http.get(`https://blacklight-studios-xv3w.onrender.com/user-rank?userId=${$scope.name}`)
        .then(function(response){
          $scope.query = "User's rank is : " + response.data.rank;
        }).catch(function(err){
          console.log(err);
        });
    }
  })