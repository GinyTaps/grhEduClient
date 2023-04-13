import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeEtablissementComponent } from './employe-etablissement.component';

describe('EmployeEtablissementComponent', () => {
  let component: EmployeEtablissementComponent;
  let fixture: ComponentFixture<EmployeEtablissementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeEtablissementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeEtablissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
