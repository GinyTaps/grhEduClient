import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeRetraiteComponent } from './employe-retraite.component';

describe('EmployeRetraiteComponent', () => {
  let component: EmployeRetraiteComponent;
  let fixture: ComponentFixture<EmployeRetraiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeRetraiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeRetraiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
