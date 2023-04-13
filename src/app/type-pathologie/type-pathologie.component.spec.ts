import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypePathologieComponent } from './type-pathologie.component';

describe('TypePathologieComponent', () => {
  let component: TypePathologieComponent;
  let fixture: ComponentFixture<TypePathologieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypePathologieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypePathologieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
