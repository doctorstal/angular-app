import { securityRetryQueueModule } from './retryQueue';
export const securityInterceptorModule = angular.module('security.interceptor', [
  securityRetryQueueModule
])

// This http interceptor listens for authentication failures
.factory('securityInterceptor', ['$q', '$injector', 'securityRetryQueue', function($q, $injector, queue) {
  return {
    'responseError': function(originalResponse) {
      if(originalResponse.status === 401) {
        // The request bounced because it was not authorized - add a new request to the retry queue
        return queue.pushRetryFn('unauthorized-server', function retryRequest() {
          // We must use $injector to get the $http service to prevent circular dependency
          return $injector.get('$http')(originalResponse.config);
        });
      }
      return $q.reject(originalResponse);
    }
  };
}])

// We have to add the interceptor to the queue as a string because the interceptor depends upon service instances that are not available in the config block.
.config(['$httpProvider', function($httpProvider: angular.IHttpProvider) {
  $httpProvider.interceptors.push('securityInterceptor');
}])
.name;