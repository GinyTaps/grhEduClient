import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeEtatCivilComponent } from './employe-etat-civil.component';

describe('EmployeEtatCivilComponent', () => {
  let component: EmployeEtatCivilComponent;
  let fixture: ComponentFixture<EmployeEtatCivilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeEtatCivilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeEtatCivilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
