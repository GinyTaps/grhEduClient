import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeTitreComponent } from './type-titre.component';

describe('TypeTitreComponent', () => {
  let component: TypeTitreComponent;
  let fixture: ComponentFixture<TypeTitreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeTitreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeTitreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
