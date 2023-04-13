import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEtablissementComponent } from './type-etablissement.component';

describe('TypeEtablissementComponent', () => {
  let component: TypeEtablissementComponent;
  let fixture: ComponentFixture<TypeEtablissementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeEtablissementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeEtablissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
