import { TestBed, inject } from '@angular/core/testing';

import { I18NotificationsService } from './i18-notifications.service';

describe('I18NotificationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [I18NotificationsService]
    });
  });

  it('should be created', inject([I18NotificationsService], (service: I18NotificationsService) => {
    expect(service).toBeTruthy();
  }));
});
