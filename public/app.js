var zlMall = angular.module('zlMall', ['ngRoute', 'ngResource', 'ngMaterial', 'ngAnimate', 'ngTouch', 'ui.bootstrap']);

zlMall.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/body.html',
    controller: 'Map'
  })
  .when('/map', {
    templateUrl: '',
    controller: ''
  })
  .otherwise({
  	redirectTo: '/'
  });
}]);