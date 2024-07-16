import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InglesNivelesComponent } from './ingles-niveles.component';

describe('InglesNivelesComponent', () => {
  let component: InglesNivelesComponent;
  let fixture: ComponentFixture<InglesNivelesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InglesNivelesComponent]
    });
    fixture = TestBed.createComponent(InglesNivelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
