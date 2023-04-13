import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeMotifRenvoiComponent } from './type-motif-renvoi.component';

describe('TypeMotifRenvoiComponent', () => {
  let component: TypeMotifRenvoiComponent;
  let fixture: ComponentFixture<TypeMotifRenvoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeMotifRenvoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeMotifRenvoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
