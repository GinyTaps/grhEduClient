import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeMotifSuspensionComponent } from './type-motif-suspension.component';

describe('TypeMotifSuspensionComponent', () => {
  let component: TypeMotifSuspensionComponent;
  let fixture: ComponentFixture<TypeMotifSuspensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeMotifSuspensionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeMotifSuspensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
