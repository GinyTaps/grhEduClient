import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeFonctionComponent } from './type-fonction.component';

describe('TypeFonctionComponent', () => {
  let component: TypeFonctionComponent;
  let fixture: ComponentFixture<TypeFonctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeFonctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeFonctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
