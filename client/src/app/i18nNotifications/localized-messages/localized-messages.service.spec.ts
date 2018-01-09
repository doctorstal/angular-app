import { TestBed, inject } from '@angular/core/testing';

import { LocalizedMessagesService } from './localized-messages.service';

describe('LocalizedMessagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalizedMessagesService]
    });
  });

  it('should be created', inject([LocalizedMessagesService], (service: LocalizedMessagesService) => {
    expect(service).toBeTruthy();
  }));
});
