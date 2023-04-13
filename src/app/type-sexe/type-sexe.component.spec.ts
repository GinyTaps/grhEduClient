import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeSexeComponent } from './type-sexe.component';

describe('TypeSexeComponent', () => {
  let component: TypeSexeComponent;
  let fixture: ComponentFixture<TypeSexeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeSexeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeSexeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
