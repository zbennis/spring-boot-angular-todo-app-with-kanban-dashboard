import {TestBed} from '@angular/core/testing';

import {TriggerNotificationService} from './trigger-notification.service';

describe('TriggerNotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TriggerNotificationService = TestBed.get(TriggerNotificationService);
    expect(service).toBeTruthy();
  });
});
