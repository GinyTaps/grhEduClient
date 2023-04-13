import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEtatCivilComponent } from './type-etat-civil.component';

describe('TypeEtatCivilComponent', () => {
  let component: TypeEtatCivilComponent;
  let fixture: ComponentFixture<TypeEtatCivilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeEtatCivilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeEtatCivilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
