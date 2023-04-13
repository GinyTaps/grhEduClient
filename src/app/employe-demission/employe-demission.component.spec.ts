import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeDemissionComponent } from './employe-demission.component';

describe('EmployeDemissionComponent', () => {
  let component: EmployeDemissionComponent;
  let fixture: ComponentFixture<EmployeDemissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeDemissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeDemissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
