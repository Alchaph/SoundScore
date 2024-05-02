import { TestBed } from '@angular/core/testing';

import { CommentServiceService } from './comment-service.service';

describe('CommentServiceService', () => {
  let service: CommentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
