describe('securityInterceptor', function() {
  var queue, interceptor, responseError, wrappedPromise;

  beforeEach(module('security.interceptor'));

  beforeEach(inject(function($injector) {
    queue = $injector.get('securityRetryQueue');
    interceptor = $injector.get('securityInterceptor');
    wrappedPromise = {};
    responseError = {};
  }));

  it('accepts responseError and returns a rejected promise', function() {
    responseError.status = 400;
    interceptor.responseError(responseError)
      .then(function() { fail('Promise should be rejected') }, 
      function(rejection){
        expect(rejection).toBe(responseError);
      });
  });

  it('does not intercept non-401 error responses', function() {
    var httpResponse = {
      status: 400
    };
    interceptor.responseError(httpResponse)
      .then(function() { fail('Promise should be rejected') }, 
      function(rejection){
        expect(rejection).toBe(responseError);
      });
  });

  it('intercepts 401 error responses and adds it to the retry queue', function() {
    var notAuthResponse = {
      status: 401
    };
    interceptor.responseError(notAuthResponse)
    .then()
    .catch(function (){fail('should not fail')})
    expect(queue.hasMore()).toBe(true);
    expect(queue.retryReason()).toBe('unauthorized-server');
  });
});
