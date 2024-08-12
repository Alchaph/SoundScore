import { TestBed } from '@angular/core/testing';

import { UserTagService } from './user-tag.service';

describe('UserTagService', () => {
  let service: UserTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
