import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtablissementRegroupementComponent } from './etablissement-regroupement.component';

describe('EtablissementRegroupementComponent', () => {
  let component: EtablissementRegroupementComponent;
  let fixture: ComponentFixture<EtablissementRegroupementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtablissementRegroupementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtablissementRegroupementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
