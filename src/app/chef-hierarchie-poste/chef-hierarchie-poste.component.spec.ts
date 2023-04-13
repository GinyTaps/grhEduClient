import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefHierarchiePosteComponent } from './chef-hierarchie-poste.component';

describe('ChefHierarchiePosteComponent', () => {
  let component: ChefHierarchiePosteComponent;
  let fixture: ComponentFixture<ChefHierarchiePosteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChefHierarchiePosteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefHierarchiePosteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
