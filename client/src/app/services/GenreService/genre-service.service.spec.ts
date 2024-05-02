import { TestBed } from '@angular/core/testing';

import { GenreServiceService } from './genre-service.service';

describe('GenreServiceService', () => {
  let service: GenreServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenreServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
