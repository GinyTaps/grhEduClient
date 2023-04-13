import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeSituationComponent } from './type-situation.component';

describe('TypeSituationComponent', () => {
  let component: TypeSituationComponent;
  let fixture: ComponentFixture<TypeSituationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeSituationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
