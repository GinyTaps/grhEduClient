import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeTransfertComponent } from './employe-transfert.component';

describe('EmployeTransfertComponent', () => {
  let component: EmployeTransfertComponent;
  let fixture: ComponentFixture<EmployeTransfertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeTransfertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
