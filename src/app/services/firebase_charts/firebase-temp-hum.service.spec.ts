import { TestBed } from '@angular/core/testing';

import { FirebaseTempHumService } from './firebase-temp-hum.service';

describe('FirebaseTempHumService', () => {
  let service: FirebaseTempHumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseTempHumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
