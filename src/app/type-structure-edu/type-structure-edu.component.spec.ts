import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeStructureEduComponent } from './type-structure-edu.component';

describe('TypeStructureEduComponent', () => {
  let component: TypeStructureEduComponent;
  let fixture: ComponentFixture<TypeStructureEduComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeStructureEduComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeStructureEduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
