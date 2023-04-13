import { TestBed } from '@angular/core/testing';

import { TypeNationaliteService } from './type-nationalite.service';

describe('TypeNationaliteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeNationaliteService = TestBed.get(TypeNationaliteService);
    expect(service).toBeTruthy();
  });
});
