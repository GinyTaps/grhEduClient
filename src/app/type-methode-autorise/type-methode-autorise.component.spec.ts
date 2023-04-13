import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeMethodeAutoriseComponent } from './type-methode-autorise.component';

describe('TypeMethodeAutoriseComponent', () => {
  let component: TypeMethodeAutoriseComponent;
  let fixture: ComponentFixture<TypeMethodeAutoriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeMethodeAutoriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeMethodeAutoriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
