import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute, Router} from '@angular/router';
import {of} from 'rxjs';
import {HeadNavBarComponent} from './head-nav-bar.component';
import {LanguageService} from '../../services/languageService/language.service';
import {JwtServiceService} from '../../services/JwtService/jwt-service.service';
import {LoaderService} from '../../services/LoaderService/loader.service';
import {NotificationService} from '../../services/NotificationService/notification.service';
import {Language} from '../../enums/language';
import {User} from '../../models/User';
import {Notification} from '../../models/Notification';
import {TranslateModule} from "@ngx-translate/core";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

class MockLanguageService {
  getLanguages = jasmine.createSpy('getLanguages').and.returnValue(Object.keys(Language));
}

class MockJwtServiceService {
  getMe = jasmine.createSpy('getMe').and.returnValue(of({id: 1, notifications: []}));
}

class MockLoaderService {
  getIsLoading = jasmine.createSpy('getIsLoading').and.returnValue(of(false));
}

class MockNotificationService {
  markAsRead = jasmine.createSpy('markAsRead').and.returnValue(of(null));
}

describe('HeadNavBarComponent', () => {
  let component: HeadNavBarComponent;
  let fixture: ComponentFixture<HeadNavBarComponent>;
  let router: MockRouter;
  let languageService: MockLanguageService;
  let jwtService: MockJwtServiceService;
  let loaderService: MockLoaderService;
  let notificationService: MockNotificationService;

  let HeadNavBarComponentMock: Partial<HeadNavBarComponent>;

  beforeEach(async () => {
    HeadNavBarComponentMock = {
      logout: jasmine.createSpy('logout'),
      refresh: jasmine.createSpy('refresh'),
      gotoUserProfile: jasmine.createSpy('gotoUserProfile'),
      updateUser: jasmine.createSpy('updateUser'),
      handleNotification: jasmine.createSpy('handleNotification'),
      createTextsToDisplay: jasmine.createSpy('createTextsToDisplay')
    };
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        TranslateModule.forRoot()],
      providers: [
        {provide: Router, useClass: MockRouter},
        {provide: LanguageService, useClass: MockLanguageService},
        {provide: JwtServiceService, useClass: MockJwtServiceService},
        {provide: LoaderService, useClass: MockLoaderService},
        {provide: NotificationService, useClass: MockNotificationService},
        {provide: HeadNavBarComponent, useValue: HeadNavBarComponentMock},
        {provide: ActivatedRoute, useValue: {snapshot: {paramMap: {get: () => '1'}}}}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeadNavBarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as any;
    languageService = TestBed.inject(LanguageService) as any;
    jwtService = TestBed.inject(JwtServiceService) as any;
    loaderService = TestBed.inject(LoaderService) as any;
    notificationService = TestBed.inject(NotificationService) as any;
    fixture.detectChanges();
  });

  it('should clear token and navigate to home on logout', () => {
    spyOn(localStorage, 'setItem');
    component.logout();
    expect(localStorage.setItem).toHaveBeenCalledWith('token', '');
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it('should initialize isLoading and call updateUser', () => {
    spyOn(component, 'updateUser');
    component.ngOnInit();
    expect(loaderService.getIsLoading).toHaveBeenCalled();
    expect(component.isLoading).toBe(of(false));
    expect(component.updateUser).toHaveBeenCalled();
  });

  it('should fetch profile picture if not in sessionStorage', (done) => {
    spyOn(sessionStorage, 'getItem').and.returnValue(null);
    spyOn(sessionStorage, 'setItem');

    component.ngOnInit();

    setTimeout(() => {
      expect(sessionStorage.setItem).toHaveBeenCalled();
      done();
    }, 1000); // Adjust the timeout based on API response time
  });

  it('should reload the window if URL is home', () => {
    spyOn(window.location, 'reload');
    spyOnProperty(window.location, 'href', 'get').and.returnValue('http://localhost:4200/home');

    component.refresh();

    expect(window.location.reload).toHaveBeenCalled();
  });

  it('should not reload the window if URL is not home', () => {
    spyOn(window.location, 'reload');
    spyOnProperty(window.location, 'href', 'get').and.returnValue('http://localhost:4200/other');

    component.refresh();

    expect(window.location.reload).not.toHaveBeenCalled();
  });

  it('should navigate to user profile and reload if necessary', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(localStorage, 'setItem');
    spyOn(window.location, 'reload');
    spyOnProperty(window.location, 'href', 'get').and.returnValue('http://localhost:4200/home/userProfile');

    component.gotoUserProfile();

    expect(localStorage.setItem).toHaveBeenCalledWith('selectedTabProfileTab', '0');
    expect(router.navigate).toHaveBeenCalledWith(['/home/userProfile', '0', '0']);
    expect(window.location.reload).toHaveBeenCalled();
  });

  it('should update user and unread notifications', () => {
    const mockUser: User = {id: 1, notifications: [{read: false}]} as User;
    jwtService.getMe.and.returnValue(of(mockUser));

    component.updateUser();

    expect(component.userId).toBe(1);
    expect(component.user).toBe(mockUser);
    expect(component.unreadNotifications.length).toBe(1);
  });

  it('should return correct text for like notification', () => {
    const notification: Notification = {
      likeOrDislike: {like: true, user: {username: 'user1'}},
      post: {title: 'postTitle'}
    } as Notification;

    const result = component.createTextsToDisplay(notification);

    expect(result).toBe('user1 liked your post postTitle');
  });

  it('should return correct text for comment on post notification', () => {
    const notification: Notification = {
      comment: {user: {username: 'user2'}, message: 'commentMessage'},
      post: {title: 'postTitle'}
    } as Notification;

    const result = component.createTextsToDisplay(notification);

    expect(result).toBe('user2 commented on your post postTi...');
  });

  it('should return correct text for reply to comment notification', () => {
    const notification: Notification = {
      comment: {user: {username: 'user3'}, message: 'commentMessage'}
    } as Notification;

    const result = component.createTextsToDisplay(notification);

    expect(result).toBe('user3 replied to your comment comme...');
  });

  it('should truncate text if longer than 35 characters', () => {
    const notification: Notification = {
      comment: {user: {username: 'user4'}, message: 'a'.repeat(40)}
    } as Notification;

    const result = component.createTextsToDisplay(notification);

    expect(result).toBe('user4 replied to your comment aaaaa...');
  });

  it('should mark notification as read and navigate to post', () => {
    const notification: Notification = {
      post: {id: 123}
    } as Notification;

    component.handleNotification(notification);

    expect(notificationService.markAsRead).toHaveBeenCalledWith(notification);
    expect(router.navigate).toHaveBeenCalledWith(['/home/post/123']);
  });

  it('should mark notification as read and navigate to comment post', () => {
    const notification: Notification = {
      comment: {post: {id: 456}}
    } as Notification;

    component.handleNotification(notification);

    expect(notificationService.markAsRead).toHaveBeenCalledWith(notification);
    expect(router.navigate).toHaveBeenCalledWith(['/home/post/456']);
  });
});
