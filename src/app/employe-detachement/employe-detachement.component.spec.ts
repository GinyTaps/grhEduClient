import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeDetachementComponent } from './employe-detachement.component';

describe('EmployeDetachementComponent', () => {
  let component: EmployeDetachementComponent;
  let fixture: ComponentFixture<EmployeDetachementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeDetachementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeDetachementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
