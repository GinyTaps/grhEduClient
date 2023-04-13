import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployePathologieComponent } from './employe-pathologie.component';

describe('EmployePathologieComponent', () => {
  let component: EmployePathologieComponent;
  let fixture: ComponentFixture<EmployePathologieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployePathologieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployePathologieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
