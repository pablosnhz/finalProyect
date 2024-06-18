import { TestBed } from '@angular/core/testing';

import { SocialesService } from './sociales.service';

describe('SocialesService', () => {
  let service: SocialesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
