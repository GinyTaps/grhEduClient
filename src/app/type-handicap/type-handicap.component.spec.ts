import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeHandicapComponent } from './type-handicap.component';

describe('TypeHandicapComponent', () => {
  let component: TypeHandicapComponent;
  let fixture: ComponentFixture<TypeHandicapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeHandicapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeHandicapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
