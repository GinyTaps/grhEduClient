import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployePosteComponent } from './employe-poste.component';

describe('EmployePosteComponent', () => {
  let component: EmployePosteComponent;
  let fixture: ComponentFixture<EmployePosteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployePosteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployePosteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
