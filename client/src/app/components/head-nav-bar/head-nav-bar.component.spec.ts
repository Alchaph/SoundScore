import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeadNavBarComponent } from './head-nav-bar.component';
import { HeaderService } from '../../services/HeaderService/header.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, of } from 'rxjs';
import { Notification } from '../../models/Notification';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

describe('HeadNavBarComponent', () => {
  let component: HeadNavBarComponent;
  let fixture: ComponentFixture<HeadNavBarComponent>;
  let headerServiceMock: any;
  let routerMock: any;
  let activatedRouteMock = {
    snapshot: {
      paramMap: {
        get: jasmine.createSpy('get').and.returnValue('1')
      }
    }
  };

  let headNavBarComponentMock: Partial<HeadNavBarComponent>;

  beforeEach(async () => {
    headNavBarComponentMock = {
      search: jasmine.createSpy('search'),
      logout: jasmine.createSpy('logout'),
      gotoUserProfile: jasmine.createSpy('gotoUserProfile'),
      handleNotification: jasmine.createSpy('handleNotification')
    };
    headerServiceMock = {
      loaderService: {
        getIsLoading: jasmine.createSpy('getIsLoading').and.returnValue(of(false))
      },
      updateUser: jasmine.createSpy('updateUser'),
      searchTerm: {
        valid: true,
        getRawValue: jasmine.createSpy('getRawValue').and.returnValue('test')
      },
      userId: 1,
      notificationService: {
        markAsRead: jasmine.createSpy('markAsRead').and.returnValue(of({}))
      }
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate').and.returnValue(Promise.resolve(true))
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, TranslateModule.forRoot()],
      providers: [
        { provide: HeaderService, useValue: headerServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: HeadNavBarComponent, useValue: headNavBarComponentMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeadNavBarComponent);
    component = fixture.componentInstance;
    component.$destroy = new BehaviorSubject<boolean>(false);
  });

  afterEach(() => {
    component.$destroy.next(true);
    component.$destroy.complete();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test for ngOnInit
  it('should initialize correctly', (done) => {
    spyOn(sessionStorage, 'getItem').and.returnValue(null);
    spyOn(sessionStorage, 'setItem');

    component.ngOnInit();

    setTimeout(() => {
      expect(headerServiceMock.loaderService.getIsLoading).toHaveBeenCalled();
      expect(headerServiceMock.updateUser).toHaveBeenCalled()
      done();
    }, 100);
  });

  it('should handle ngOnInit when profile picture already exists', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue('http://example.com');

    component.ngOnInit();

    expect(headerServiceMock.loaderService.getIsLoading).toHaveBeenCalled();
    expect(headerServiceMock.updateUser).toHaveBeenCalled();
  });

  // Test for search
  it('should navigate to search page when searchTerm is valid', () => {
    component.search();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home/search/', 'test']);
  });

  it('should not navigate to search page when searchTerm is invalid', () => {
    headerServiceMock.searchTerm.valid = false;
    component.search();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  // Test for logout
  it('should clear token and navigate to root', () => {
    spyOn(localStorage, 'setItem');

    component.logout();

    expect(routerMock.navigate).toHaveBeenCalledWith(['']);
    expect(localStorage.setItem).toHaveBeenCalledWith('token', '');
  });

  // Test for gotoUserProfile
  it('should navigate to user profile page and reload if already there', (done) => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(localStorage, 'setItem');

    component.gotoUserProfile();

    setTimeout(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('selectedTabProfileTab', '0');
      expect(routerMock.navigate).toHaveBeenCalledWith(['/home/userProfile', '1', null]);
      done();
    }, 100);
  });

  it('should handle gotoUserProfile when selectedTabProfileTab already exists', () => {
    spyOn(localStorage, 'getItem').and.returnValue('1');

    component.gotoUserProfile();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/home/userProfile', '1', '1']);
  });

  // Test for handleNotification
  it('should mark notification as read and navigate to post', () => {
    const notification = { post: { id: 1 }, comment: { post: { id: 1 } } } as Notification;

    component.handleNotification(notification);

    expect(headerServiceMock.notificationService.markAsRead).toHaveBeenCalledWith(notification);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home/post/1']);
  });

  it('should handle handleNotification with undefined post', () => {
    const notification = { comment: { post: { id: 1 } } } as Notification;

    component.handleNotification(notification);

    expect(headerServiceMock.notificationService.markAsRead).toHaveBeenCalledWith(notification);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home/post/1']);
  });
});
