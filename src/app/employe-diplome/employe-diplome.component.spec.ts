import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeDiplomeComponent } from './employe-diplome.component';

describe('EmployeDiplomeComponent', () => {
  let component: EmployeDiplomeComponent;
  let fixture: ComponentFixture<EmployeDiplomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeDiplomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeDiplomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
