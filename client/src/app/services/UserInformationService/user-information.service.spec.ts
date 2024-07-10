import { TestBed } from '@angular/core/testing';

import { UserInformationService } from './user-information.service';

describe('UserInformationService', () => {
  let service: UserInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
