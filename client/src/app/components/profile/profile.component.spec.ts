import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {BehaviorSubject, of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let location = {
    back: jasmine.createSpy('back')
  }
  let routerMock = {
    navigate: jasmine.createSpy('navigate')
  }
  let routeMock: any;

  let profileComponentMock: Partial<ProfileComponent>;

  beforeEach(async () => {
    jasmine.getEnv().allowRespy(true);
    profileComponentMock = {
      goBack: jasmine.createSpy('goBack'),
      onTabChange: jasmine.createSpy('onTabChange')
    };
    const locationSpy = jasmine.createSpyObj('Location', ['back']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    routeMock = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('1')
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TranslateModule.forRoot(), HttpClientModule, BrowserAnimationsModule],
      providers: [
        { provide: Location, useValue: location },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: ProfileComponent, useValue: profileComponentMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.$destroy = new BehaviorSubject<boolean>(false);
  });

  afterEach(() => {
    component.$destroy.next(true);
    component.$destroy.complete();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('goBack', () => {
    it('should call location.back()', () => {
      component.goBack();
      expect(location.back).toHaveBeenCalled();
    });

    it('should not call location.back() when location is null', () => {
      component['location'] = null as any;
      expect(() => component.goBack()).toThrowError();
    });
  });

  describe('ngOnInit', () => {
    it('should set selectedTab from route params and save to localStorage', () => {
      component.ngOnInit();
      expect(component.selectedTab).toBe('1');
      expect(localStorage.getItem('selectedTabProfileTab')).toBe('1');
    });

    it('should set selectedTab to default value and save to localStorage if param is null', () => {
      routeMock.snapshot.paramMap.get.and.returnValue(null);
      component.ngOnInit();
      expect(component.selectedTab).toBe('0');
      expect(localStorage.getItem('selectedTabProfileTab')).toBe('0');
    });
  });

  describe('onTabChange', () => {
    it('should save the tab index to localStorage and navigate to the correct route', () => {
      routeMock.snapshot.paramMap.get.and.returnValue('123');
      component.onTabChange(1);
      expect(localStorage.getItem('selectedTabProfileTab')).toBe('1');
      expect(routerMock.navigate).toHaveBeenCalledWith(['home/userProfile', '123', '1']);
    });

    it('should navigate to the correct route if no route params', () => {
      routeMock.snapshot.paramMap.get.and.returnValue(null);
      component.onTabChange(1);
      expect(routerMock.navigate).toHaveBeenCalledWith(['home/userProfile', null, '1']);
    });
  });
});
