import { TestBed } from '@angular/core/testing';

import { NaturalesService } from './naturales.service';

describe('NaturalesService', () => {
  let service: NaturalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NaturalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
