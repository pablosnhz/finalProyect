import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturaNivelesComponent } from './lectura-niveles.component';

describe('LecturaNivelesComponent', () => {
  let component: LecturaNivelesComponent;
  let fixture: ComponentFixture<LecturaNivelesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LecturaNivelesComponent]
    });
    fixture = TestBed.createComponent(LecturaNivelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
