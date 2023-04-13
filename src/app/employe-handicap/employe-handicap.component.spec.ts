import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeHandicapComponent } from './employe-handicap.component';

describe('EmployeHandicapComponent', () => {
  let component: EmployeHandicapComponent;
  let fixture: ComponentFixture<EmployeHandicapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeHandicapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeHandicapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
