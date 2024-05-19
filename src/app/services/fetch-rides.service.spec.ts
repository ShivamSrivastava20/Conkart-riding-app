import { TestBed } from '@angular/core/testing';

import { FetchRidesService } from './fetch-rides.service';

describe('FetchRidesService', () => {
  let service: FetchRidesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchRidesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
