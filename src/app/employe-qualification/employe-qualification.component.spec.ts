import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeQualificationComponent } from './employe-qualification.component';

describe('EmployeQualificationComponent', () => {
  let component: EmployeQualificationComponent;
  let fixture: ComponentFixture<EmployeQualificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeQualificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
