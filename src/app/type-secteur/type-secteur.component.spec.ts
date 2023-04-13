import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeSecteurComponent } from './type-secteur.component';

describe('TypeSecteurComponent', () => {
  let component: TypeSecteurComponent;
  let fixture: ComponentFixture<TypeSecteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeSecteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeSecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
