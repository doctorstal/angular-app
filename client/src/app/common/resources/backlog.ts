export const resourcesProductBaclogModule = angular.module('resources.productbacklog', [
  'mongolabResource'
])
.factory('ProductBacklog', ['mongolabResource', function (mongolabResource) {
  var ProductBacklog = mongolabResource('productbacklog');

  ProductBacklog.forProject = function (projectId) {
    return ProductBacklog.query({projectId:projectId});
  };

  return ProductBacklog;
}]);
