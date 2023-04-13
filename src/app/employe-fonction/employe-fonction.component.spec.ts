import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeFonctionComponent } from './employe-fonction.component';

describe('EmployeFonctionComponent', () => {
  let component: EmployeFonctionComponent;
  let fixture: ComponentFixture<EmployeFonctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeFonctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeFonctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
