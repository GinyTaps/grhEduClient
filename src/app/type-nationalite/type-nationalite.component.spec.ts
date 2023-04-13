import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeNationaliteComponent } from './type-nationalite.component';

describe('TypeNationaliteComponent', () => {
  let component: TypeNationaliteComponent;
  let fixture: ComponentFixture<TypeNationaliteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeNationaliteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeNationaliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
