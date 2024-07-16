import { TestBed } from '@angular/core/testing';

import { TimeFinalService } from './time-final.service';

describe('TimeFinalService', () => {
  let service: TimeFinalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeFinalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
