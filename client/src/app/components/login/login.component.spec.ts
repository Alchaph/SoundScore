import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { JwtServiceService } from '../../services/JwtService/jwt-service.service';
import { CookieService } from '../../services/CookieService/cookie.service';
import { UserInformationService } from '../../services/UserInformationService/user-information.service';
import { User } from "../../models/User";
import { Verification } from "../../models/Verification";
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let jwtService: JwtServiceService;
  let userInformationService: UserInformationService;
  let cookieService: CookieService;
  let translateService: TranslateService;

  beforeEach(() => {
    jasmine.getEnv().allowRespy(true);
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        {
          provide: JwtServiceService,
          useValue: {
            login: jasmine.createSpy('login').and.returnValue(of({ token: 'mockToken' })),
            register: jasmine.createSpy('register').and.returnValue(of({ success: true })),
            usernameExists: jasmine.createSpy('usernameExists').and.returnValue(of(false)),
            emailExists: jasmine.createSpy('emailExists').and.returnValue(of(false)),
            verify: jasmine.createSpy('verify').and.returnValue(of(true)),
            deleteAccountByUsername: jasmine.createSpy('deleteAccountByUsername').and.returnValue(of({})),
            getEMailByUsername: jasmine.createSpy('getEMailByUsername').and.returnValue(of({ data: 'mockEmail' })),
            authenticate: jasmine.createSpy('authenticate').and.returnValue(of({ success: true })),
            updatePassword: jasmine.createSpy('updatePassword').and.returnValue(of({})),
            getMe: jasmine.createSpy('getMe').and.returnValue(of({})),
            getUsernameByEMail: jasmine.createSpy('getUsernameByEMail').and.returnValue(of({ data: 'mockUsername' })),
          }
        },
        {
          provide: CookieService,
          useValue: {
            getCookie: jasmine.createSpy('getCookie').and.callFake((name: string) => 'mockCookieValue'),
            setCookie: jasmine.createSpy('setCookie'),
            deleteCookie: jasmine.createSpy('deleteCookie'),
          }
        },
        {
          provide: UserInformationService,
          useValue: {
            setMessage: jasmine.createSpy('setMessage'),
            getMessage: jasmine.createSpy('getMessage').and.returnValue('mockMessage'),
          }
        },
        {
          provide: LoginComponent,
          useClass: LoginComponent
        },
        TranslateService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    jwtService = TestBed.inject(JwtServiceService);
    userInformationService = TestBed.inject(UserInformationService);
    cookieService = TestBed.inject(CookieService);
    translateService = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    describe('ngOnInit', () => {
      it('should clear localStorage', () => {
        spyOn(localStorage, 'clear');
        component.ngOnInit();
        expect(localStorage.clear).toHaveBeenCalled();
      });
    });

    describe('changeForm', () => {
      it('should toggle isRegister', () => {
        const initial = component.isRegister;
        component.changeForm();
        expect(component.isRegister).toBe(!initial);
      });
    });

    describe('register', () => {
      it('should register successfully', () => {
        spyOn(jwtService, 'usernameExists').and.returnValue(of(false));
        spyOn(jwtService, 'emailExists').and.returnValue(of(false));
        spyOn(jwtService, 'register').and.returnValue(of({} as User));
        spyOn(jwtService, 'login').and.returnValue(of({token: 'dummyToken', expiresIn : 1000}));
        spyOn(userInformationService, 'setMessage');

        component.registerForm.setValue({
          email: 'test@example.com',
          otp: '',
          username: 'testuser',
          password: 'password123',
          repeatPassword: 'password123'
        });

        component.register();

        expect(userInformationService.setMessage).not.toHaveBeenCalled();
      });

      it('should show error if username exists', () => {
        spyOn(jwtService, 'usernameExists').and.returnValue(of(true));
        spyOn(userInformationService, 'setMessage');

        component.registerForm.controls.username.setValue('existinguser');
        component.register();

        expect(userInformationService.setMessage).toHaveBeenCalledWith('Username is already taken');
      });

      it('should show error if email exists', () => {
        spyOn(jwtService, 'usernameExists').and.returnValue(of(false));
        spyOn(jwtService, 'emailExists').and.returnValue(of(true));
        spyOn(userInformationService, 'setMessage');

        component.registerForm.controls.username.setValue('newuser');
        component.registerForm.controls.password.setValue('password123');
        component.registerForm.controls.repeatPassword.setValue('password123');
        component.registerForm.controls.email.setValue('existing@example.com');
        component.register();

        expect(userInformationService.setMessage).toHaveBeenCalledWith('Email is already registered');
      });

      it('should show error if username is invalid', () => {
        spyOn(jwtService, 'usernameExists').and.returnValue(of(false));
        spyOn(jwtService, 'emailExists').and.returnValue(of(false));
        spyOn(userInformationService, 'setMessage');

        component.registerForm.controls.username.setValue('');
        component.registerForm.controls.email.setValue('test@example.com');
        component.registerForm.controls.password.setValue('password123');
        component.registerForm.controls.repeatPassword.setValue('password123');
        component.register();

        expect(userInformationService.setMessage).toHaveBeenCalledWith('Username is not valid');
      });

      it('should show error if email is invalid', () => {
        spyOn(jwtService, 'usernameExists').and.returnValue(of(false));
        spyOn(jwtService, 'emailExists').and.returnValue(of(false));
        spyOn(userInformationService, 'setMessage');

        component.registerForm.controls.username.setValue('newuser');
        component.registerForm.controls.email.setValue('invalidemail');
        component.registerForm.controls.password.setValue('password123');
        component.registerForm.controls.repeatPassword.setValue('password123');
        component.register();

        expect(userInformationService.setMessage).toHaveBeenCalledWith('Email is not valid');
      });

      it('should show error if passwords do not match', () => {
        spyOn(jwtService, 'usernameExists').and.returnValue(of(false));
        spyOn(jwtService, 'emailExists').and.returnValue(of(false));
        spyOn(userInformationService, 'setMessage');

        component.registerForm.controls.username.setValue('newuser');
        component.registerForm.controls.email.setValue('test@example.com');
        component.registerForm.controls.password.setValue('password123');
        component.registerForm.controls.repeatPassword.setValue('differentpassword');
        component.register();

        expect(userInformationService.setMessage).toHaveBeenCalledWith('Passwords do not match');
      });
    });

    describe('login', () => {
      it('should login successfully', () => {
        spyOn(jwtService, 'login').and.returnValue(of({token: 'dummyToken', expiresIn: 1000}));
        spyOn(cookieService, 'getCookie').and.returnValue(null);
        spyOn(jwtService, 'getEMailByUsername').and.returnValue(of({data: 'test@example.com'}));
        spyOn(jwtService, 'authenticate').and.returnValue(of(true));
        spyOn(userInformationService, 'setMessage');

        component.registerForm.setValue({
          email: 'test@example.com',
          otp: '',
          username: 'testuser',
          password: 'password123',
          repeatPassword: 'password123'
        });

        component.login();

        expect(userInformationService.setMessage).not.toHaveBeenCalled();
      });

      it('should show error if login fails', () => {
        spyOn(jwtService, 'login').and.returnValue(throwError({}));
        spyOn(userInformationService, 'setMessage');

        component.registerForm.controls.username.setValue('testuser');
        component.registerForm.controls.password.setValue('wrongpassword');
        component.login();

        expect(userInformationService.setMessage).toHaveBeenCalledWith('Username or password is not correct');
      });

      it('should show error if username is invalid', () => {
        spyOn(userInformationService, 'setMessage');

        component.registerForm.controls.username.setValue('');
        component.registerForm.controls.password.setValue('password123');
        component.login();

        expect(userInformationService.setMessage).toHaveBeenCalledWith('Username is not valid');
      });

      it('should show error if password is invalid', () => {
        spyOn(userInformationService, 'setMessage');

        component.registerForm.controls.username.setValue('testuser');
        component.registerForm.controls.password.setValue('');
        component.login();

        expect(userInformationService.setMessage).toHaveBeenCalledWith('Password is not valid');
      });
    });

    describe('verifyOtp', () => {
      it('should verify OTP successfully', () => {
        spyOn(jwtService, 'verify').and.returnValue(of(true));
        spyOn(jwtService, 'deleteAccountByUsername').and.returnValue(of({} as User));
        spyOn(userInformationService, 'setMessage');

        component.email = 'test@example.com';
        component.username = 'testuser';
        component.TwoFA = true;

        component.verifyOtp();

        expect(userInformationService.setMessage).not.toHaveBeenCalled();
      });

      it('should show error if OTP verification fails', () => {
        spyOn(jwtService, 'verify').and.returnValue(of(false));
        spyOn(userInformationService, 'setMessage');

        component.email = 'test@example.com';
        component.username = 'testuser';
        component.TwoFA = true;

        component.verifyOtp();

        expect(userInformationService.setMessage).toHaveBeenCalledWith('OTP is not valid');
      });

      it('should show error if account could not be created', () => {
        spyOn(jwtService, 'verify').and.returnValue(of(true));
        spyOn(jwtService, 'deleteAccountByUsername').and.returnValue(of({} as User));
        spyOn(userInformationService, 'setMessage');

        component.email = 'test@example.com';
        component.username = 'testuser';
        component.Otp = true;

        component.verifyOtp();

        expect(userInformationService.setMessage).toHaveBeenCalledWith('Account could not be created');
      });

      it('should show error if OTP is invalid', () => {
        spyOn(jwtService, 'verify').and.returnValue(of(false));
        spyOn(userInformationService, 'setMessage');

        component.email = 'test@example.com';
        component.username = 'testuser';
        component.Otp = true;

        component.verifyOtp();

        expect(userInformationService.setMessage).toHaveBeenCalledWith('OTP is not valid');
      });
    });

    describe('verifyEmail', () => {
      it('should verify email successfully', () => {
        spyOn(jwtService, 'authenticate').and.returnValue(of(true));
        spyOn(jwtService, 'getUsernameByEMail').and.returnValue(of({data: 'testuser'}));
        spyOn(userInformationService, 'setMessage');

        component.registerForm.controls.email.setValue('test@example.com');
        component.verifyEmail();

        expect(userInformationService.setMessage).not.toHaveBeenCalled();
      });

      it('should show error if email verification fails', () => {
        spyOn(jwtService, 'authenticate').and.returnValue(of(false));
        spyOn(userInformationService, 'setMessage');

        component.registerForm.controls.email.setValue('invalid@example.com');
        component.verifyEmail();

        expect(userInformationService.setMessage).toHaveBeenCalledWith('Email is not valid');
      });

      it('should show error if username retrieval fails', () => {
        spyOn(jwtService, 'authenticate').and.returnValue(of(true));
        spyOn(jwtService, 'getUsernameByEMail').and.returnValue(of({ undefined } as unknown as { data: string }));
        spyOn(userInformationService, 'setMessage');

        component.registerForm.controls.email.setValue('test@example.com');
        component.verifyEmail();

        expect(userInformationService.setMessage).toHaveBeenCalledWith('Could not find user');
      });
    });

    describe('resendOtp', () => {
      it('should resend OTP successfully', () => {
        spyOn(jwtService, 'authenticate').and.returnValue(of(true));
        spyOn(userInformationService, 'setMessage');

        component.email = 'test@example.com';
        component.resendOtp();

        expect(userInformationService.setMessage).toHaveBeenCalledWith('OTP was resent');
      });

      it('should show error if OTP resend fails', () => {
        spyOn(jwtService, 'authenticate').and.returnValue(of(false));
        spyOn(userInformationService, 'setMessage');

        component.email = 'test@example.com';
        component.resendOtp();

        expect(userInformationService.setMessage).toHaveBeenCalledWith('Could not resend OTP');
      });
    });

    describe('changePassword', () => {
      it('should change password successfully', () => {
        spyOn(jwtService, 'updatePassword').and.returnValue(of({id: 1}) as Observable<User>);
        spyOn(jwtService, 'login').and.returnValue(of({token: 'dummyToken', expiresIn: 1000}));
        spyOn(userInformationService, 'setMessage');

        component.email = 'test@example.com';
        component.username = 'testuser';
        component.registerForm.controls.password.setValue('newpassword');
        component.registerForm.controls.repeatPassword.setValue('newpassword');

        component.changePassword();

        expect(userInformationService.setMessage).not.toHaveBeenCalled();
      });

      it('should show error if passwords do not match', () => {
        spyOn(userInformationService, 'setMessage');

        component.registerForm.controls.password.setValue('newpassword');
        component.registerForm.controls.repeatPassword.setValue('differentpassword');

        component.changePassword();

        expect(userInformationService.setMessage).toHaveBeenCalledWith('Passwords do not match');
      });

      it('should show error if password update fails', () => {
        spyOn(jwtService, 'updatePassword').and.returnValue(of({ undefined } as unknown as User));
        spyOn(userInformationService, 'setMessage');

        component.registerForm.controls.password.setValue('newPassword');
        component.registerForm.controls.repeatPassword.setValue('newPassword');
        component.changePassword();

        expect(userInformationService.setMessage).toHaveBeenCalledWith('Could not update password');
      });

      it('should show error if login after password change fails', () => {
        spyOn(jwtService, 'updatePassword').and.returnValue(of({id: 1} as User));
        spyOn(jwtService, 'login').and.returnValue(of(undefined) as unknown as Observable<{ token: string, expiresIn: number }>);
        spyOn(userInformationService, 'setMessage');

        component.email = 'test@example.com';
        component.username = 'testuser';
        component.registerForm.controls.password.setValue('newpassword');
        component.registerForm.controls.repeatPassword.setValue('newpassword');
        component.changePassword();

        expect(userInformationService.setMessage).toHaveBeenCalledWith('Could not login');
      });
    });
  });
