import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeRegroupementComponent } from './employe-regroupement.component';

describe('EmployeRegroupementComponent', () => {
  let component: EmployeRegroupementComponent;
  let fixture: ComponentFixture<EmployeRegroupementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeRegroupementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeRegroupementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
