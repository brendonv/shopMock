angular.module('zlMall')
  .directive('zlRewardDetail', [function() {
    return {
      scope: {
        store: "="
      },
      templateUrl: '/views/reward-detail.html',
      link: function(scope, el, attr) {
        scope.$watch("store", function() {
        });
      }
    };
  }]);