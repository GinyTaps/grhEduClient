import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeMutationComponent } from './employe-mutation.component';

describe('EmployeMutationComponent', () => {
  let component: EmployeMutationComponent;
  let fixture: ComponentFixture<EmployeMutationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeMutationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeMutationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
