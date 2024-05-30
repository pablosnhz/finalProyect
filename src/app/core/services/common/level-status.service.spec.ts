import { TestBed } from '@angular/core/testing';

import { LevelStatusService } from './level-status.service';

describe('LevelStatusService', () => {
  let service: LevelStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LevelStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
