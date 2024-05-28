import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelsCompletedComponent } from './levels-completed.component';

describe('LevelsCompletedComponent', () => {
  let component: LevelsCompletedComponent;
  let fixture: ComponentFixture<LevelsCompletedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LevelsCompletedComponent]
    });
    fixture = TestBed.createComponent(LevelsCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
