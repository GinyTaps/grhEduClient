import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeMilieuComponent } from './type-milieu.component';

describe('TypeMilieuComponent', () => {
  let component: TypeMilieuComponent;
  let fixture: ComponentFixture<TypeMilieuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeMilieuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeMilieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
