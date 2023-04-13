import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeStatutEtablissementComponent } from './type-statut-etablissement.component';

describe('TypeStatutEtablissementComponent', () => {
  let component: TypeStatutEtablissementComponent;
  let fixture: ComponentFixture<TypeStatutEtablissementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeStatutEtablissementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeStatutEtablissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
