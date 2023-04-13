import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeStatutComponent } from './employe-statut.component';

describe('EmployeStatutComponent', () => {
  let component: EmployeStatutComponent;
  let fixture: ComponentFixture<EmployeStatutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeStatutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeStatutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
