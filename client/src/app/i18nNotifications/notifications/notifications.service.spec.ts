import { rootScopeProvider } from './../../../upgrade';
import { TestBed, inject } from '@angular/core/testing';

import { NotificationsService } from './notifications.service';

describe('NotificationsService', () => {
  let handlers: any = {};
  let $scope = {
    $on: (eventName, handler: Function) => {
      handlers[eventName] = (handlers[eventName] || []).concat(handler);
      
    },
    $emit: (eventName) => handlers[eventName] && handlers[eventName].forEach(handler=>handler.apply())
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotificationsService, 
        {
          provide: '$rootScope',
          useValue: $scope
        }
      ]
    });
  });

  let notifications;
  

  beforeEach(inject([NotificationsService], (service: NotificationsService)=>{
    notifications = service;
  }));

  it('should be created', inject([NotificationsService], (service: NotificationsService) => {
    expect(service).toBeTruthy();
  }));

  describe('global notifications crud', function () {

    it('should allow to add, get and remove notifications', function () {
      var not1 = notifications.pushSticky({msg:'Watch out!'});
      var not2 = notifications.pushSticky({msg:'Just an info!'});
      expect(notifications.getCurrent().length).toBe(2);

      notifications.remove(not2);
      expect(notifications.getCurrent().length).toEqual(1);
      expect(notifications.getCurrent()[0]).toBe(not1);

      notifications.removeAll();
      expect(notifications.getCurrent().length).toEqual(0);
    });

    it('removal of a non-existing notification doesnt trigger errors', function () {
      notifications.remove({});
    });

    it('should reject notifications that are not objects', function () {
      expect(function(){
        notifications.pushSticky("not an object");
      }).toThrow(new Error("Only object can be added to the notification service"));
    });
  });

  describe('notifications expiring after route change', function () {

    it('should remove notification after route change', function () {
      var sticky = notifications.pushSticky({msg:'Will stick around after route change'});
      var currentRoute = notifications.pushForCurrentRoute({msg:'Will go away after route change'});
      expect(notifications.getCurrent().length).toEqual(2);
      $scope.$emit('$routeChangeSuccess');
      expect(notifications.getCurrent().length).toEqual(1);
      expect(notifications.getCurrent()[0]).toBe(sticky);
    });
  });


  describe('notifications showing on next route change and expiring on a subsequent one', function () {

    it('should advertise a notification after a route change and remove on the subsequent route change', function () {
      notifications.pushSticky({msg:'Will stick around after route change'});
      notifications.pushForNextRoute({msg:'Will not be there till after route change'});
      expect(notifications.getCurrent().length).toEqual(1);
      $scope.$emit('$routeChangeSuccess');
      expect(notifications.getCurrent().length).toEqual(2);
      $scope.$emit('$routeChangeSuccess');
      expect(notifications.getCurrent().length).toEqual(1);
    });
  });
});
