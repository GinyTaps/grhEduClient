import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtablissementSecteurComponent } from './etablissement-secteur.component';

describe('EtablissementSecteurComponent', () => {
  let component: EtablissementSecteurComponent;
  let fixture: ComponentFixture<EtablissementSecteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtablissementSecteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtablissementSecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
