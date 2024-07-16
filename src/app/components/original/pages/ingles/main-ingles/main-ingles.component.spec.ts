import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainInglesComponent } from './main-ingles.component';

describe('MainInglesComponent', () => {
  let component: MainInglesComponent;
  let fixture: ComponentFixture<MainInglesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainInglesComponent]
    });
    fixture = TestBed.createComponent(MainInglesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
