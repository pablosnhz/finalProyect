import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaturalesNivelesComponent } from './naturales-niveles.component';

describe('NaturalesNivelesComponent', () => {
  let component: NaturalesNivelesComponent;
  let fixture: ComponentFixture<NaturalesNivelesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NaturalesNivelesComponent]
    });
    fixture = TestBed.createComponent(NaturalesNivelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
