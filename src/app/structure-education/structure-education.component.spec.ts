import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureEducationComponent } from './structure-education.component';

describe('StructureEducationComponent', () => {
  let component: StructureEducationComponent;
  let fixture: ComponentFixture<StructureEducationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureEducationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
