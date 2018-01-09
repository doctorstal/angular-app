import { Injectable, Inject } from '@angular/core';

@Injectable()
export class NotificationsService {

  constructor( @Inject('$rootScope') private $rootScope) {
    $rootScope.$on('$routeChangeSuccess', () => {
      this.notifications.ROUTE_CURRENT.length = 0;

      this.notifications.ROUTE_CURRENT = angular.copy(this.notifications.ROUTE_NEXT);
      this.notifications.ROUTE_NEXT.length = 0;
    });
  }

  notifications = {
    'STICKY': [],
    'ROUTE_CURRENT': [],
    'ROUTE_NEXT': []
  };

  private addNotification(notificationsArray, notificationObj) {
    if (!angular.isObject(notificationObj)) {
      throw new Error("Only object can be added to the notification service");
    }
    notificationsArray.push(notificationObj);
    return notificationObj;
  }

  getCurrent() {
    return [].concat(this.notifications.STICKY, this.notifications.ROUTE_CURRENT);
  }

  pushSticky(notification) {
    return this.addNotification(this.notifications.STICKY, notification);
  }

  pushForCurrentRoute(notification) {
    return this.addNotification(this.notifications.ROUTE_CURRENT, notification);
  }

  pushForNextRoute(notification) {
    return this.addNotification(this.notifications.ROUTE_NEXT, notification);
  }

  remove(notification) {
    angular.forEach(this.notifications, (notificationsByType) => {
      var idx = notificationsByType.indexOf(notification);
      if (idx > -1) {
        notificationsByType.splice(idx, 1);
      }
    });
  }

  removeAll() {
    angular.forEach(this.notifications, (notificationsByType) => {
      notificationsByType.length = 0;
    });
  }

}
