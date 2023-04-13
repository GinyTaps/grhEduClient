import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeMotifRetraiteComponent } from './type-motif-retraite.component';

describe('TypeMotifRetraiteComponent', () => {
  let component: TypeMotifRetraiteComponent;
  let fixture: ComponentFixture<TypeMotifRetraiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeMotifRetraiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeMotifRetraiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
