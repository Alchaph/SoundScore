import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsComponent } from './settings.component';
import { JwtService } from '../../services/JwtService/jwt.service';
import {ActivatedRoute, Router} from '@angular/router';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/User';
import { UserInformationService } from '../../services/UserInformationService/user-information.service';
import { CookieService } from '../../services/CookieService/cookie.service';
import {TranslateModule} from "@ngx-translate/core";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let jwtServiceMock = {
    getMe: jasmine.createSpy('getMe').and.returnValue(of({ email: 'test@example.com', username: 'testuser', password: 'password', artist: null, notifications: [], id: 1 } as unknown as User)),
    verifyPassword: jasmine.createSpy('verifyPassword').and.returnValue(of(true)),
    authenticate: jasmine.createSpy('authenticate').and.returnValue(of(true)),
    updateUser: jasmine.createSpy('updateUser').and.returnValue(of({})),
    login: jasmine.createSpy('login').and.returnValue(of({ token: 'dummy-token' })),
    deleteMe: jasmine.createSpy('deleteMe').and.returnValue(of({ username: 'testuser' }))
  };
  let routerMock = {
    navigate: jasmine.createSpy('navigate')
  };
  let userInformationServiceMock = {
    setMessage: jasmine.createSpy('setMessage')
  };
  let cookieServiceMock  = {
    deleteCookie: jasmine.createSpy('deleteCookie'),
    getCookie: jasmine.createSpy('getCookie').and.returnValue('true')
  };

  let SettingsComponentMock: Partial<SettingsComponent>;

  beforeEach(async () => {
    SettingsComponentMock = {
      deleteYourself: jasmine.createSpy('deleteYourself'),
      onUserSettingsSubmit: jasmine.createSpy('onUserSettingsSubmit'),
      ngOnInit: jasmine.createSpy('ngOnInit')
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TranslateModule.forRoot(), HttpClientModule, BrowserAnimationsModule],
      providers: [
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: UserInformationService, useValue: userInformationServiceMock },
        { provide: CookieService, useValue: cookieServiceMock },
        { provide: SettingsComponent, useValue: SettingsComponentMock },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: jasmine.createSpy('get').and.returnValue('1') } } } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize user form with user data (positive test)', () => {
      component.ngOnInit();
      expect(jwtServiceMock.getMe).toHaveBeenCalled();
      expect(component.userForm.controls.email.value).toBe('test@example.com');
      expect(component.userForm.value.username).toBe('testuser');
    });

    it('should handle error when getMe fails (negative test)', () => {
      jwtServiceMock.getMe.and.returnValue(of(undefined));
      component.ngOnInit();
      expect(jwtServiceMock.getMe).toHaveBeenCalled();
    });
  });

  describe('onUserSettingsSubmit', () => {
    beforeEach(() => {
      component.userForm.setValue({
        oldPassword: 'oldPass',
        password: 'password',
        confirmPassword: 'password',
        email: 'test@example.com',
        username: 'testuser'
      });
    });

    it('should submit form data and update user (positive test)', () => {
      component.onUserSettingsSubmit();
      expect(jwtServiceMock.verifyPassword).toHaveBeenCalledWith('testuser', 'oldPass');
      expect(jwtServiceMock.updateUser).toHaveBeenCalled();
      expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
    });

    it('should show error message when form is invalid (negative test)', () => {
      component.userForm.controls.email.setValue('');
      component.userForm.controls.username.setValue('');
      component.onUserSettingsSubmit();
      expect(userInformationServiceMock.setMessage).toHaveBeenCalledWith('Please fill in all fields');
    });

    it('should show error message when new password is same as old password', () => {
      component.userForm.controls.password.setValue('oldPass');
      component.userForm.controls.confirmPassword.setValue('oldPass');
      component.onUserSettingsSubmit();
      expect(userInformationServiceMock.setMessage).toHaveBeenCalledWith('New password must be different from old password');
    });

    it('should show error message when passwords do not match', () => {
      component.userForm.controls.confirmPassword.setValue('differentPass');
      component.onUserSettingsSubmit();
      expect(userInformationServiceMock.setMessage).toHaveBeenCalledWith('Passwords do not match');
    });

    it('should show error message when old password is incorrect', () => {
      jwtServiceMock.verifyPassword.and.returnValue(of(false));
      component.onUserSettingsSubmit();
      expect(userInformationServiceMock.setMessage).toHaveBeenCalledWith('Old password is incorrect');
    });

    it('should show error message when email is already registered', () => {
      jwtServiceMock.authenticate.and.returnValue(of(false));
      component.onUserSettingsSubmit();
      expect(userInformationServiceMock.setMessage).toHaveBeenCalledWith('Email is already registered');
    });

    it('should show error message when email is not valid', () => {
      jwtServiceMock.authenticate.and.returnValue(of(false));
      component.onUserSettingsSubmit();
      expect(userInformationServiceMock.setMessage).toHaveBeenCalledWith('Email is already registered');
    });
  });

  describe('deleteYourself', () => {
    //Not possible because of HTMLElemets and audio.play must interact with user first
    // it('should delete user account (positive test)', (done) => {
    //   spyOn(window, 'setTimeout').and.callThrough();
    //   component.deleteYourself();
    //   expect(component.disabled).toBeTrue();
    //   expect(jwtServiceMock.deleteMe).toHaveBeenCalled();
    //   setTimeout(() => {
    //     expect(cookieServiceMock.deleteCookie).toHaveBeenCalledWith('2fa_verifiedtestuser');
    //     expect(routerMock.navigate).toHaveBeenCalledWith(['']);
    //     done();
    //   }, 500);
    // });

    it('should handle error during delete user account (negative test)', (done) => {
      jwtServiceMock.deleteMe.and.returnValue(of(undefined));
      spyOn(window, 'setTimeout').and.callThrough();
      component.deleteYourself();
      expect(component.disabled).toBeTrue();
      setTimeout(() => {
        done();
      }, 500);
    });
  });
});
