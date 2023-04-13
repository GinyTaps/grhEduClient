import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEchelonComponent } from './type-echelon.component';

describe('TypeEchelonComponent', () => {
  let component: TypeEchelonComponent;
  let fixture: ComponentFixture<TypeEchelonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeEchelonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeEchelonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
