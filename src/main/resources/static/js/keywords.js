angular.module('mainApp').controller('keywordsController', function ($scope, $http) {
  $scope.keywords = [];
  $scope.newKeyword = "";
  $scope.getScheduledKeywords = function () {
    $http.get('/get-scheduled-keywords')
      .then(function (data) {
        console.log(data);
        $scope.keywords = data.data;
      });
  };
  $scope.deleteScheduledKeyword = function (keyword) {
    $http.post('/delete-scheduled-keyword?keyword=' + keyword);
    $scope.getScheduledKeywords();
  };
  $scope.addScheduledKeyword = function () {
    $http.post('/save-scheduled-keyword?keyword=' + $scope.newKeyword).then(function (value) {
      $scope.getScheduledKeywords();
      $scope.newKeyword = "";
    });
  };
});