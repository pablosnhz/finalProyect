import { TestBed } from '@angular/core/testing';

import { LecturaCriticaService } from './lectura-critica.service';

describe('LecturaCriticaService', () => {
  let service: LecturaCriticaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LecturaCriticaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
