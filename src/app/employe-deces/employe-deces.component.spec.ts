import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeDecesComponent } from './employe-deces.component';

describe('EmployeDecesComponent', () => {
  let component: EmployeDecesComponent;
  let fixture: ComponentFixture<EmployeDecesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeDecesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeDecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
