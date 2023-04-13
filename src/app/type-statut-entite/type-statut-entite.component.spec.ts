import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeStatutEntiteComponent } from './type-statut-entite.component';

describe('TypeStatutEntiteComponent', () => {
  let component: TypeStatutEntiteComponent;
  let fixture: ComponentFixture<TypeStatutEntiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeStatutEntiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeStatutEntiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
