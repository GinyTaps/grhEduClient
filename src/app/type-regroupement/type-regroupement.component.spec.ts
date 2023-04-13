import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeRegroupementComponent } from './type-regroupement.component';

describe('TypeRegroupementComponent', () => {
  let component: TypeRegroupementComponent;
  let fixture: ComponentFixture<TypeRegroupementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeRegroupementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeRegroupementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
