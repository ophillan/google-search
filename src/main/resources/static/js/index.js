var mainApp = angular.module('mainApp', ['ngRoute', 'ngSanitize', 'CopyToClipboard']);

mainApp.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "landing.html",
      controller: 'landingController'
    })
    .when("/saved", {
      templateUrl: "saved.html",
      controller: 'savedSearchesController'
    })
    .when("/keywords", {
      templateUrl: "keywords.html",
      controller: 'keywordsController'
    })
    .when('/query-details/:param1', {
      templateUrl: 'query-details.html',
      controller: 'queryDetailsController'
    })
});