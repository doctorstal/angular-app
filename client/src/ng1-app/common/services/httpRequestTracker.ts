export const servicesHttpRequestTracker = angular.module('services.httpRequestTracker', [])
  .factory('httpRequestTracker', ['$http', function ($http) {

    var httpRequestTracker: any = {};
    httpRequestTracker.hasPendingRequests = function () {
      return $http.pendingRequests.length > 0;
    };

    return httpRequestTracker;
  }])  
.name;