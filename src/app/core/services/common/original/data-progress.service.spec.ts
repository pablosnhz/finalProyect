import { TestBed } from '@angular/core/testing';

import { DataProgressService } from './data-progress.service';

describe('DataProgressService', () => {
  let service: DataProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
