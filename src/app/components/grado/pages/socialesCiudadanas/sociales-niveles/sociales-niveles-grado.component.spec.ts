import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialesNivelesComponent } from './sociales-niveles.component';

describe('SocialesNivelesComponent', () => {
  let component: SocialesNivelesComponent;
  let fixture: ComponentFixture<SocialesNivelesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SocialesNivelesComponent]
    });
    fixture = TestBed.createComponent(SocialesNivelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
