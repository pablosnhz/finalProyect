import { TestBed } from '@angular/core/testing';

import { SheetsDatesService } from './sheets-dates.service';

describe('SheetsDatesService', () => {
  let service: SheetsDatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SheetsDatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
