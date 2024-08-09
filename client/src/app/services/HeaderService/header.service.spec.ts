import { TestBed } from '@angular/core/testing';
import { HeaderService } from './header.service';
import { LanguageService } from '../languageService/language.service';
import { JwtService } from '../JwtService/jwt.service';
import { LoaderService } from '../LoaderService/loader.service';
import { NotificationService } from '../NotificationService/notification.service';
import { of } from 'rxjs';
import { User } from '../../models/User';
import { Notification } from '../../models/Notification';

describe('HeaderService', () => {
  let service: HeaderService;
  let jwtServiceMock: any;
  let notificationServiceMock: any;
  let loaderServiceMock: any;
  let languageServiceMock: any;

  beforeEach(() => {
    jwtServiceMock = {
      getMe: jasmine.createSpy('getMe').and.returnValue(of({ id: 1, notifications: [], email: 'email', password: 'password', username: 'username' } as User))
    };

    notificationServiceMock = {
      markAllAsRead: jasmine.createSpy('markAllAsRead').and.returnValue(of({}))
    };

    loaderServiceMock = {
      getIsLoading: jasmine.createSpy('getIsLoading').and.returnValue(of(false))
    };

    languageServiceMock = {
      getLanguages: jasmine.createSpy('getLanguages').and.returnValue(['EN', 'DE'])
    };

    TestBed.configureTestingModule({
      providers: [
        HeaderService,
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: NotificationService, useValue: notificationServiceMock },
        { provide: LoaderService, useValue: loaderServiceMock },
        { provide: LanguageService, useValue: languageServiceMock }
      ]
    });

    service = TestBed.inject(HeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test for updateUser
  it('should update user data and unread notifications', () => {
    const user = { id: 1, notifications: [{ read: false }] } as User;
    jwtServiceMock.getMe.and.returnValue(of(user));

    service.updateUser();

    expect(jwtServiceMock.getMe).toHaveBeenCalled();
    expect(service.userId).toBe(user.id!);
    expect(service.user).toEqual(user);
    expect(service.unreadNotifications.length).toBe(1);
  });

  it('should handle updateUser with no data', () => {
    jwtServiceMock.getMe.and.returnValue(of({id: undefined} as User));

    service.updateUser();

    expect(jwtServiceMock.getMe).toHaveBeenCalled();
    expect(service.userId).toBe(0);
    expect(service.user).toEqual({} as User);
    expect(service.unreadNotifications.length).toBe(0);
  });

  // Test for createTextsToDisplay
  it('should create text for like notification', () => {
    const notification = { likeOrDislike: { like: true, user: { username: 'User1' } }, post: { title: 'Post1' } } as Notification;
    const result = service.createTextsToDisplay(notification);
    expect(result).toBe('User1 liked your post Post1');
  });

  it('should create text for comment notification', () => {
    const notification = { comment: { user: { username: 'User2' }, message: 'Message' }, post: { title: 'Post2' } } as Notification;
    const result = service.createTextsToDisplay(notification);
    expect(result).toBe('User2 commented on your post Post2');
  });

  it('should create text for reply notification', () => {
    const notification = { comment: { user: { username: 'User3' }, message: 'Message' } } as Notification;
    const result = service.createTextsToDisplay(notification);
    expect(result).toBe('User3 replied to your comment Messa...');
  });

  it('should truncate long text', () => {
    const notification = { comment: { user: { username: 'User4' }, message: 'A very long message that exceeds thirty-five characters' }, post: { title: 'Post4' } } as Notification;
    const result = service.createTextsToDisplay(notification);
    expect(result).toBe('User4 commented on your post Post4');
  });

  // Test for markAllAsRead
  it('should mark all notifications as read', () => {
    service.unreadNotifications = [{ read: false } as Notification];
    service.user = { id: 1 } as User;

    service.markAllAsRead();

    expect(notificationServiceMock.markAllAsRead).toHaveBeenCalledWith(service.user);
    expect(service.unreadNotifications.length).toBe(0);
  });

  it('should handle markAllAsRead with empty notifications', () => {
    service.unreadNotifications = [];
    service.user = { id: 1 } as User;

    service.markAllAsRead();

    expect(notificationServiceMock.markAllAsRead).toHaveBeenCalledWith(service.user);
    expect(service.unreadNotifications.length).toBe(0);
  });
});
