import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeChaineLocComponent } from './type-chaine-loc.component';

describe('TypeChaineLocComponent', () => {
  let component: TypeChaineLocComponent;
  let fixture: ComponentFixture<TypeChaineLocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeChaineLocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeChaineLocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
