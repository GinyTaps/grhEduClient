import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeMotifDecesComponent } from './type-motif-deces.component';

describe('TypeMotifDecesComponent', () => {
  let component: TypeMotifDecesComponent;
  let fixture: ComponentFixture<TypeMotifDecesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeMotifDecesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeMotifDecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
