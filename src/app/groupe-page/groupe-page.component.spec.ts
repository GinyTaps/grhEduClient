import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupePageComponent } from './groupe-page.component';

describe('GroupePageComponent', () => {
  let component: GroupePageComponent;
  let fixture: ComponentFixture<GroupePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
