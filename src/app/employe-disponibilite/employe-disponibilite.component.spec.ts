import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeDisponibiliteComponent } from './employe-disponibilite.component';

describe('EmployeDisponibiliteComponent', () => {
  let component: EmployeDisponibiliteComponent;
  let fixture: ComponentFixture<EmployeDisponibiliteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeDisponibiliteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeDisponibiliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
