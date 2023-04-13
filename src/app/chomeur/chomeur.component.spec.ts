import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChomeurComponent } from './chomeur.component';

describe('ChomeurComponent', () => {
  let component: ChomeurComponent;
  let fixture: ComponentFixture<ChomeurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChomeurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChomeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
