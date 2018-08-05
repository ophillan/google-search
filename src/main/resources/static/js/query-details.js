angular.module('mainApp').controller('queryDetailsController', function ($scope, $http, $location, $routeParams) {
  $scope.clipboardLinks = [];
  $scope.searchResults = [];
  $scope.searchDates = [];
  $scope.bla = "";

  $scope.getResultsByKeyword = function () {
    $scope.clipboardLinks = [];
    $scope.searchResults = [];
    $http.get('/get-saved-results-by-keyword?keyword=' + $routeParams.param1).then(
      function (result) {
        var resultDates = result.data;
        for (var count = 0; count < resultDates.length; count++) {
          var item = {};
          item.id = count;
          item.date = resultDates[count].searchTime;
          item.keyword = resultDates[count].keyword;
          $scope.searchDates.push(item);
        }

        // filter uniques
        var obj = {};
        for (var i = 0, len = $scope.searchDates.length; i < len; i++) obj[$scope.searchDates[i]['place']] = $scope.searchDates[i];
        $scope.searchDates = [];
        for (var key in obj) $scope.searchDates.push(obj[key]);

        console.log($scope.searchDates);
        for (var tmp = 0; tmp < $scope.searchDates.length; tmp++) {
          console.log($scope.searchDates[tmp].date);
          $http.get('/get-saved-results-by-date-and-keyword?keyword=' + $routeParams.param1 + '&date=' + new Date($scope.searchDates[tmp].date).toISOString()).then(
            function (result) {
              console.log(result.data);
              var resultUrls = result.data;
              for (var count = 0; count < resultUrls.length; count++) {
                var item = {};
                item.title = resultUrls[count].title;
                item.snippet = resultUrls[count].description;
                item.link = resultUrls[count].link;
                item.ctUrl = resultUrls[count].googleLink;
                item.id = count;
                var newItem = {};
                newItem.date = resultUrls[count].searchTime;
                newItem.id = count;
                $scope.searchDates.push(newItem);
              }

            },
            function (e) {
              console.log(e)
            });
        }
      },
      function (reason) {
        console.log(reason)
      });
  };

  $scope.collapse = function (id) {
    var el = $('#collapse' + id);
    var panel = $('#panel' + id);
    if (el.hasClass('collapsed')) {
      el.removeClass('collapsed');
      panel.removeClass('collapsed');
      $(el).collapse('show');
    } else {
      el.addClass('collapsed');
      panel.addClass('collapsed');
      $(el).collapse('hide');
    }
  };

  $scope.pushToClipboard = function (ctUrl) {
    if ($scope.clipboardLinks.includes(ctUrl)) {
      console.log("Removing link");
      var index = $scope.clipboardLinks.indexOf(ctUrl);
      $scope.clipboardLinks.splice(index, 1);
    } else {
      console.log("Adding link");
      $scope.clipboardLinks.push(ctUrl);
    }
    if ($scope.clipboardLinks.length === 0) {
      $copyToClipboard.copy(" ").then(function () {
        console.log("Clipboard cleared!");
      })
    } else {
      $copyToClipboard.copy($scope.clipboardLinks.join("\n")).then(function () {
        console.log("Clipboard updated!");
      });
    }
  };

});