import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeGradeComponent } from './type-grade.component';

describe('TypeGradeComponent', () => {
  let component: TypeGradeComponent;
  let fixture: ComponentFixture<TypeGradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeGradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
