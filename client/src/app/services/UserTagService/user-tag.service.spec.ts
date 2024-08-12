import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserTagService } from './user-tag.service';
import { HttpService } from '../HttpService/http.service';

import { UserTag } from '../../models/UserTag';
import {environment} from "../../../environments/environments";

describe('UserTagService', () => {
  let service: UserTagService;
  let httpMock: HttpTestingController;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpService', ['getHttpOptions']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserTagService,
        { provide: HttpService, useValue: spy }
      ]
    });

    service = TestBed.inject(UserTagService);
    httpMock = TestBed.inject(HttpTestingController);
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#createTag', () => {
    it('should return an Observable<UserTag> (positive case)', () => {
      const dummyTag: UserTag = { id: 1, user: { id: 1, username: 'Test User', password: 'password', email: 'email', premium: false, notifications: [], followers: [] }, taggedUser: { id: 1, username: 'Test User', password: 'password', email: 'email', premium: false, notifications: [], followers: [] }, post: {
          id: 1,
          title: 'Test Post',
          content: 'Test Content',
          user: {
            id: 1,
            username: 'Test User',
            password: 'password',
            email: 'email',
            premium: false,
            notifications: [],
            followers: []
          },
          likes: [],
          dislikes: [],
          image: ''
        }, comment: {
          id: 1,
          post: {
            id: 1,
            title: 'Test Post',
            content: 'Test Content',
            user: {
              id: 1,
              username: 'Test User',
              password: 'password',
              email: 'email',
              premium: false,
              notifications: [],
              followers: []
            },
            likes: [],
            dislikes: [],
            image: ''
          },
          user: {
            id: 1,
            username: 'Test User',
            password: 'password',
            email: 'email',
            premium: false,
            notifications: [],
            followers: []
          },
          title: '',
          message: ''
        } };
      const httpOptions:  { headers: { Authorization: string; }; } | { headers: {}; } = { headers: {} };

      httpServiceSpy.getHttpOptions.and.returnValue(httpOptions);

      service.createTag(dummyTag).subscribe(tag => {
        expect(tag).toEqual(dummyTag);
      });

      const req = httpMock.expectOne(`${environment.url}/usertags`);
      expect(req.request.method).toBe('POST');
      req.flush(dummyTag);
    });

    it('should handle error (negative case)', () => {
      const dummyTag: UserTag = { id: 1, user: { id: 1, username: 'Test User', password: 'password', email: 'email', premium: false, notifications: [], followers: [] }, taggedUser: { id: 1, username: 'Test User', password: 'password', email: 'email', premium: false, notifications: [], followers: [] }, post: {
          id: 1,
          title: 'Test Post',
          content: 'Test Content',
          user: {
            id: 1,
            username: 'Test User',
            password: 'password',
            email: 'email',
            premium: false,
            notifications: [],
            followers: []
          },
          likes: [],
          dislikes: [],
          image: ''
        }, comment: {
          id: 1,
          post: {
            id: 1,
            title: 'Test Post',
            content: 'Test Content',
            user: {
              id: 1,
              username: 'Test User',
              password: 'password',
              email: 'email',
              premium: false,
              notifications: [],
              followers: []
            },
            likes: [],
            dislikes: [],
            image: ''
          },
          user: {
            id: 1,
            username: 'Test User',
            password: 'password',
            email: 'email',
            premium: false,
            notifications: [],
            followers: []
          },
          title: '',
          message: ''
        } };      const httpOptions:  { headers: { Authorization: string; }; } | { headers: {}; } = { headers: {} };

      httpServiceSpy.getHttpOptions.and.returnValue(httpOptions);

      service.createTag(dummyTag).subscribe(
        () => fail('expected an error, not user tag'),
        error => expect(error.status).toBe(500)
      );

      const req = httpMock.expectOne(`${environment.url}/usertags`);
      expect(req.request.method).toBe('POST');
      req.flush('Something went wrong', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('#deleteTag', () => {
    it('should return an Observable<void> (positive case)', () => {
      const id = 1;
      const httpOptions:  { headers: { Authorization: string; }; } | { headers: {}; } = { headers: {} };

      httpServiceSpy.getHttpOptions.and.returnValue(httpOptions);

      service.deleteTag(id).subscribe(response => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne(`${environment.url}/usertags/${id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });

    it('should handle error (negative case)', () => {
      const id = 1;
      const httpOptions:  { headers: { Authorization: string; }; } | { headers: {}; } = { headers: {} };

      httpServiceSpy.getHttpOptions.and.returnValue(httpOptions);

      service.deleteTag(id).subscribe(
        () => fail('expected an error, not void'),
        error => expect(error.status).toBe(404)
      );

      const req = httpMock.expectOne(`${environment.url}/usertags/${id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    });
  });
});
