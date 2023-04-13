import { TestBed } from '@angular/core/testing';

import { TypeSexeService } from './type-sexe.service';

describe('TypeSexeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeSexeService = TestBed.get(TypeSexeService);
    expect(service).toBeTruthy();
  });
});
