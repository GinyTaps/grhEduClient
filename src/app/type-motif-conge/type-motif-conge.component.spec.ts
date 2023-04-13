import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeMotifCongeComponent } from './type-motif-conge.component';

describe('TypeMotifCongeComponent', () => {
  let component: TypeMotifCongeComponent;
  let fixture: ComponentFixture<TypeMotifCongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeMotifCongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeMotifCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
