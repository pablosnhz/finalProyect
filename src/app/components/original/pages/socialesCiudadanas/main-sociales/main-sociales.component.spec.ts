import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSocialesComponent } from './main-sociales.component';

describe('MainSocialesComponent', () => {
  let component: MainSocialesComponent;
  let fixture: ComponentFixture<MainSocialesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainSocialesComponent]
    });
    fixture = TestBed.createComponent(MainSocialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
