import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeStatutComponent } from './type-statut.component';

describe('TypeStatutComponent', () => {
  let component: TypeStatutComponent;
  let fixture: ComponentFixture<TypeStatutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeStatutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeStatutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
