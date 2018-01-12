import { servicesI18nNotificationsModule } from './i18nNotifications';

describe('i18nNotifications', function () {

  var i18nNotifications, notifications, localizedMessages;
  beforeEach(function () {
    angular.module('test', [servicesI18nNotificationsModule]).value('I18N.MESSAGES', {});
  });
  beforeEach(function() {
    angular.mock.module('test');
  });
  beforeEach(inject(function (_i18nNotifications_, _notifications_, _localizedMessages_) {
    i18nNotifications = _i18nNotifications_;
    notifications = _notifications_;
    localizedMessages = _localizedMessages_;
  }));

  describe('creating new notification based on localized messages', function () {

    it('should add a new sticky notification based on a localized message and its type', function () {
      spyOn(notifications, 'pushSticky');
      i18nNotifications.pushSticky('i18n.key', 'success');
      expect(notifications.pushSticky).toHaveBeenCalledWith({message: '?i18n.key?', type: 'success'})
    });
  });

  describe('proxy getCurrent and remove methods', function () {

    it('should proxy getCurent method', function () {
      spyOn(notifications, 'getCurrent');
      i18nNotifications.getCurrent();
      expect(notifications.getCurrent).toHaveBeenCalled();
    });

    it('should proxy remove method', function () {
      var notification = {};
      spyOn(notifications, 'remove');
      i18nNotifications.remove(notification);
      expect(notifications.remove).toHaveBeenCalledWith(notification);
    });
  });

});