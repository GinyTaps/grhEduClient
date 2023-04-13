import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeRepAdminComponent } from './employe-rep-admin.component';

describe('EmployeRepAdminComponent', () => {
  let component: EmployeRepAdminComponent;
  let fixture: ComponentFixture<EmployeRepAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeRepAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeRepAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
