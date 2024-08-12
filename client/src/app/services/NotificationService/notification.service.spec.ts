import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NotificationService } from './notification.service';
import { HttpService } from '../HttpService/http.service';
import { Notification } from '../../models/Notification';
import { User } from '../../models/User';
import {Comment} from "../../models/Comment";
import {LikeOrDislike} from "../../models/LikeOrDislike";
import {environment} from "../../../environments/environments";

describe('NotificationService', () => {
  let service: NotificationService;
  let httpMock: HttpTestingController;
  let httpService: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NotificationService, HttpService]
    });
    service = TestBed.inject(NotificationService);
    httpMock = TestBed.inject(HttpTestingController);
    httpService = TestBed.inject(HttpService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should mark a notification as read', () => {
    const dummyNotification: Notification =  { id: 1, comment: {} as Comment, read: true, likeOrDislike: {} as LikeOrDislike, receiver: {} as User, sender: {} as User };
    const responseNotification: Notification = { ...dummyNotification, read: true };

    service.markAsRead(dummyNotification).subscribe(notification => {
      expect(notification).toEqual(responseNotification);
    });

    const req = httpMock.expectOne(environment.url + `/notifications/markAsRead/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(responseNotification);
  });

  it('should handle error when marking a notification as read', () => {
    const dummyNotification: Notification =  { id: 1, comment: {} as Comment, read: true, likeOrDislike: {} as LikeOrDislike, receiver: {} as User, sender: {} as User };

    service.markAsRead(dummyNotification).subscribe(
      () => fail('expected an error, not notifications'),
      error => expect(error.status).toBe(500)
    );

    const req = httpMock.expectOne(environment.url + `/notifications/markAsRead/1`);
    expect(req.request.method).toBe('PUT');
    req.flush('Something went wrong', { status: 500, statusText: 'Server Error' });
  });

  it('should mark all notifications as read for a user', () => {
    const dummyUser: User = { id: 1, username: 'Test User', password: 'password', email: 'email', notifications: [], premium: false, followers: [] };
    const responseNotifications: Notification[] = [
    { id: 1, comment: {} as Comment, read: true, likeOrDislike: {} as LikeOrDislike, receiver: {} as User, sender: {} as User },
    { id: 2, comment: {} as Comment, read: true, likeOrDislike: {} as LikeOrDislike, receiver: {} as User, sender: {} as User }
    ];

    service.markAllAsRead(dummyUser).subscribe(notifications => {
      expect(notifications).toEqual(responseNotifications);
    });

    const req = httpMock.expectOne(environment.url + `/notifications/markAllAsRead.id`);
    expect(req.request.method).toBe('PUT');
    req.flush(responseNotifications);
  });

  it('should handle error when marking all notifications as read', () => {
    const dummyUser: User = { id: 1, username: 'Test User', password: 'password', email: 'email', notifications: [], premium: false, followers: [] };
    service.markAllAsRead(dummyUser).subscribe(
      () => fail('expected an error, not notifications'),
      error => expect(error.status).toBe(500)
    );

    const req = httpMock.expectOne(environment.url + `/notifications/markAllAsRead.id`);
    expect(req.request.method).toBe('PUT');
    req.flush('Something went wrong', { status: 500, statusText: 'Server Error' });
  });
});
