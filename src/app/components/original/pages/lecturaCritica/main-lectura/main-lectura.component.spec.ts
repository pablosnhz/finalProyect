import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLecturaComponent } from './main-lectura.component';

describe('MainLecturaComponent', () => {
  let component: MainLecturaComponent;
  let fixture: ComponentFixture<MainLecturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainLecturaComponent]
    });
    fixture = TestBed.createComponent(MainLecturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
