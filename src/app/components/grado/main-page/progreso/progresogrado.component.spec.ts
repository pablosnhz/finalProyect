import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgresoComponent } from './progreso.component';

describe('ProgresoComponent', () => {
  let component: ProgresoComponent;
  let fixture: ComponentFixture<ProgresoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgresoComponent]
    });
    fixture = TestBed.createComponent(ProgresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
