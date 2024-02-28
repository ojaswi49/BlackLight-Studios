app.controller("ctrl3", function ($scope,$http){
    $scope.name = "";
    $scope.getRank = function(){
      $http.post("http://localhost:8000/user-rank",{userId : $scope.name})
        .then(function(response){
          $scope.query = "User's rank is : " + response.data.rank;
        }).catch(function(err){
          console.log(err);
        });
    }
  })