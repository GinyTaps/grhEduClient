import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeSituationComponent } from './employe-situation.component';

describe('EmployeSituationComponent', () => {
  let component: EmployeSituationComponent;
  let fixture: ComponentFixture<EmployeSituationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeSituationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
