import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeSuspensionComponent } from './employe-suspension.component';

describe('EmployeSuspensionComponent', () => {
  let component: EmployeSuspensionComponent;
  let fixture: ComponentFixture<EmployeSuspensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeSuspensionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeSuspensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
