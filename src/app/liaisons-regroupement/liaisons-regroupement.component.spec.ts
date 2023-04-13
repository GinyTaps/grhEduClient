import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiaisonsRegroupementComponent } from './liaisons-regroupement.component';

describe('LiaisonsRegroupementComponent', () => {
  let component: LiaisonsRegroupementComponent;
  let fixture: ComponentFixture<LiaisonsRegroupementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiaisonsRegroupementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiaisonsRegroupementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
