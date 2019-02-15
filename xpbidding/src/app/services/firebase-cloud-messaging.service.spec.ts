import { TestBed } from '@angular/core/testing';

import { FirebaseCloudMessagingService } from './firebase-cloud-messaging.service';

describe('FirebaseCloudMessagingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseCloudMessagingService = TestBed.get(FirebaseCloudMessagingService);
    expect(service).toBeTruthy();
  });
});
