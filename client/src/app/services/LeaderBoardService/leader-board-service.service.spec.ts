import { TestBed } from '@angular/core/testing';

import { LeaderBoardServiceService } from './leader-board-service.service';

describe('LeaderBoardServiceService', () => {
  let service: LeaderBoardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaderBoardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
