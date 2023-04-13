import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeRenvoiComponent } from './employe-renvoi.component';

describe('EmployeRenvoiComponent', () => {
  let component: EmployeRenvoiComponent;
  let fixture: ComponentFixture<EmployeRenvoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeRenvoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeRenvoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
