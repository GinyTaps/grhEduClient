import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDiplomeComponent } from './type-diplome.component';

describe('TypeDiplomeComponent', () => {
  let component: TypeDiplomeComponent;
  let fixture: ComponentFixture<TypeDiplomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeDiplomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeDiplomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
