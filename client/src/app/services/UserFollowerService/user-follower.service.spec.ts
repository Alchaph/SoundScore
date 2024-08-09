import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../HttpService/http.service';
import { UserFollowerService } from './user-follower.service';
import { environment } from '../../../environments/environments';
import { User } from '../../models/User';

describe('UserFollowerService', () => {
  let service: UserFollowerService;
  let httpMock: HttpTestingController;
  let httpService: HttpService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService, UserFollowerService]
    });

    service = TestBed.inject(UserFollowerService);
    httpMock = TestBed.inject(HttpTestingController);
    httpService = TestBed.inject(HttpService);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should follow a user successfully', () => {
    const user: User = { id: 1, username: 'Test User', password: 'password', email: 'email', premium: false, notifications: [], followers: []  };
    const mockResponse = { success: true };

    service.followUser(user).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(environment.url + '/followers/follow');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should return an error when follow user fails', () => {
    const user: User = { id: 1, username: 'Test User', password: 'password', email: 'email', premium: false, notifications: [], followers: []  };
    const mockError = { status: 500, statusText: 'Server Error' };

    service.followUser(user).subscribe(
      () => fail('expected an error, not a success'),
      (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Server Error');
      }
    );

    const req = httpMock.expectOne(environment.url + '/followers/follow');
    expect(req.request.method).toBe('POST');
    req.flush(null, mockError);
  });

  it('should unfollow a user successfully', () => {
    const user: User = { id: 1, username: 'Test User', password: 'password', email: 'email', premium: false, notifications: [], followers: []  };
    const mockResponse = { success: true };

    service.unfollowUser(user).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(environment.url + '/followers/unfollow');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should return an error when unfollow user fails', () => {
    const user: User = { id: 1, username: 'Test User', password: 'password', email: 'email', premium: false, notifications: [], followers: []  };
    const mockError = { status: 500, statusText: 'Server Error' };

    service.unfollowUser(user).subscribe(
      () => fail('expected an error, not a success'),
      (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Server Error');
      }
    );

    const req = httpMock.expectOne(environment.url + '/followers/unfollow');
    expect(req.request.method).toBe('POST');
    req.flush(null, mockError);
  });
});
