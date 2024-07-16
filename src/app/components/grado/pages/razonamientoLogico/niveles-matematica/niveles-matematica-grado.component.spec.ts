import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NivelesMatematicaComponent } from './niveles-matematica.component';

describe('NivelesMatematicaComponent', () => {
  let component: NivelesMatematicaComponent;
  let fixture: ComponentFixture<NivelesMatematicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NivelesMatematicaComponent]
    });
    fixture = TestBed.createComponent(NivelesMatematicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
