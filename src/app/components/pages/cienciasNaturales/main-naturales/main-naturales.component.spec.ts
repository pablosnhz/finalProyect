import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNaturalesComponent } from './main-naturales.component';

describe('MainNaturalesComponent', () => {
  let component: MainNaturalesComponent;
  let fixture: ComponentFixture<MainNaturalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainNaturalesComponent]
    });
    fixture = TestBed.createComponent(MainNaturalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
