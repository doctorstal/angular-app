import {servicesExceptionHandlerModule} from "./exceptionHandler";

describe('exception handler', function () {

  var $exceptionHandler, notifications;
  beforeEach(function () {
    angular.module('test', [servicesExceptionHandlerModule], function($exceptionHandlerProvider){
      $exceptionHandlerProvider.mode('log');
    }).constant('I18N.MESSAGES', {'error.fatal':'Oh, snap!'});
    angular.mock.module('test');
  });
  beforeEach(inject(function (_$exceptionHandler_, _notifications_) {
    $exceptionHandler = _$exceptionHandler_;
    notifications = _notifications_;
  }));

  it('should use a localized message and push it to a notification service', function () {

    var error = new Error('Something went wrong...');
    var cause = 'Some obscure problem...';

    spyOn(notifications, 'pushForCurrentRoute');

    $exceptionHandler(error, cause);
    expect(notifications.pushForCurrentRoute).toHaveBeenCalledWith({
        type: 'error',
        message: 'Oh, snap!',
        exception: error,
        cause: cause
    });
  });

  it('should not go into infinite loop in case of problems with exception handler', function () {
    spyOn(notifications, 'pushForCurrentRoute').and.throwError('issue with notifications');
    //the syntax to test for exceptions is a bit odd...
    //http://stackoverflow.com/questions/4144686/how-to-write-a-test-which-expects-an-error-to-be-thrown
    expect(function(){
      $exceptionHandler(new Error('root cause'));
    }).toThrowError('issue with notifications');
  });

  it('should call through to the delegate', function() {
    inject(function(exceptionHandlerFactory) {
      var error = new Error('Something went wrong...');
      var cause = 'Some obscure problem...';

      var delegate = jasmine.createSpy('delegate');
      var exceptionHandler = exceptionHandlerFactory(delegate);
      exceptionHandler(error, cause);
      expect(delegate).toHaveBeenCalledWith(error, cause);
    });
  });
});