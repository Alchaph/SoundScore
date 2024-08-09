import { TestBed, ComponentFixture } from '@angular/core/testing';
import { PremiumComponent } from './premium.component';
import { UserInformationService } from '../../services/UserInformationService/user-information.service';
import { JwtServiceService } from '../../services/JwtService/jwt-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import {User} from "../../models/User";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('PremiumComponent', () => {
  let component: PremiumComponent;
  let fixture: ComponentFixture<PremiumComponent>;
  let userInformationServiceMock: any;
  let jwtServiceMock: any;
  let routerMock: any;

  let activatedTestMock = {
    snapshot: {
      paramMap: {
        get: jasmine.createSpy('get').and.returnValue('1')
      }
    }
  }

  let premiumComponentMock: Partial<PremiumComponent>;

  beforeEach(async () => {
    premiumComponentMock = {
      pay: jasmine.createSpy('pay')
    }
    userInformationServiceMock = jasmine.createSpyObj('UserInformationService', ['setMessage']);
    jwtServiceMock = {
      updateToPremium: jasmine.createSpy('updateToPremium'),
      getMe: jasmine.createSpy('getMe').and.returnValue(of({ email: 'email', username: 'test', password: 'password', artist: null, notifications: [], id: 1, premium: false, followers: [] } as unknown as User))
    }
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot(),
        MatButtonModule,
        HttpClientModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: UserInformationService, useValue: userInformationServiceMock },
        { provide: JwtServiceService, useValue: jwtServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: PremiumComponent, useValue: premiumComponentMock },
        { provide: ActivatedRoute, useValue: activatedTestMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the payGroup form', () => {
    expect(component.payGroup).toBeTruthy();
    expect(component.payGroup.controls['fullName']).toBeTruthy();
    expect(component.payGroup.controls['cardNumber']).toBeTruthy();
    expect(component.payGroup.controls['expiryDate']).toBeTruthy();
    expect(component.payGroup.controls['cvv']).toBeTruthy();
  });

  it('should successfully update to premium on pay()', () => {
    const mockUser: User = {password: "", id: 1, username: 'test', email: 'email', premium: false, notifications: [], followers: [] };
    jwtServiceMock.updateToPremium.and.returnValue(of(mockUser));

    component.pay();

    expect(jwtServiceMock.updateToPremium).toHaveBeenCalled();
    expect(userInformationServiceMock.setMessage).toHaveBeenCalledWith('Payment successful');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should fail to update to premium on pay()', () => {
    jwtServiceMock.updateToPremium.and.returnValue(of(null));

    component.pay();

    expect(jwtServiceMock.updateToPremium).toHaveBeenCalled();
    expect(userInformationServiceMock.setMessage).toHaveBeenCalledWith('Something went wrong');
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should handle error on pay()', () => {
    jwtServiceMock.updateToPremium.and.returnValue(of({undefined}));

    component.pay();

    expect(jwtServiceMock.updateToPremium).toHaveBeenCalled();
    expect(userInformationServiceMock.setMessage).toHaveBeenCalledWith('Something went wrong');
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});
