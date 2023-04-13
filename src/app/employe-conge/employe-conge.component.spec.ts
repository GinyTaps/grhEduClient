import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeCongeComponent } from './employe-conge.component';

describe('EmployeCongeComponent', () => {
  let component: EmployeCongeComponent;
  let fixture: ComponentFixture<EmployeCongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeCongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
