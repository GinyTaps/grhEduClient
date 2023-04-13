import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeAffectationComponent } from './employe-affectation.component';

describe('EmployeAffectationComponent', () => {
  let component: EmployeAffectationComponent;
  let fixture: ComponentFixture<EmployeAffectationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeAffectationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeAffectationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
