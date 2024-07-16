import { TestBed } from '@angular/core/testing';

import { ResetGameButtonService } from './reset-game-button.service';

describe('ResetGameButtonService', () => {
  let service: ResetGameButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetGameButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
