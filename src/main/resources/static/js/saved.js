angular.module('mainApp').controller('savedSearchesController', function ($scope, $http, $location) {
  $scope.searches = {}; // [];
  $scope.searchDates = [];
  $scope.activeSearches = {};
  $scope.showTable = false;
  $scope.keywords = [];
  $scope.getScheduledKeywords = function () {
    $http.get('/get-distinct-keywords')
      .then(function (data) {
        console.log(data);
        $scope.keywords = data.data;
      });
  };
  $scope.openKeywordQueries = function (path, keyword) {
    $location.path(path + '/' + keyword);
  };

  /*
  $scope.getRecentSearches = function () {
    $http.get('/saved-searches?date1=' + addDays(new Date(), -7).toISOString() + '&date2=' + addDays(new Date(), 1).toISOString())
      .then(function (data) {
        //$scope.searches = data.data;
        data.data.forEach(function (search) {
          $scope.searchDates.push(search.searchTime);
          if ($scope.searches[search.searchTime]) {
            $scope.searches[search.searchTime].push(search);
          } else {
            $scope.searches[search.searchTime] = [search];
          }
        });
        $scope.searchDates = $scope.searchDates.filter(function (item, i, ar) {
          return ar.indexOf(item) === i;
        }); // remove dupes
      });
  }; */
  $scope.showSearchesForDate = function (searchTime) {
    $scope.showTable = true;
    $scope.activeSearches = $scope.searches[searchTime];
  };

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
});
