import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeRevocationComponent } from './employe-revocation.component';

describe('EmployeRevocationComponent', () => {
  let component: EmployeRevocationComponent;
  let fixture: ComponentFixture<EmployeRevocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeRevocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeRevocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
