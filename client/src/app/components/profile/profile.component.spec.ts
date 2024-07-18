import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {HttpClientModule} from "@angular/common/http";

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let location: Location;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  let profileComponentMock: Partial<ProfileComponent>;

  beforeEach(async () => {
    profileComponentMock = {
      goBack: jasmine.createSpy('goBack'),
      onTabChange: jasmine.createSpy('onTabChange')
    };
    const locationSpy = jasmine.createSpyObj('Location', ['back']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteStub = {
      snapshot: {
        params: { id: '123' }
      },
      paramMap: of({
        get: (key: string) => key === 'tab' ? '2' : null
      })
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TranslateModule.forRoot(), HttpClientModule],
      providers: [
        { provide: Location, useValue: locationSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: ProfileComponent, useValue: profileComponentMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
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
      expect(component.selectedTab).toBe('2');
      expect(localStorage.getItem('selectedTabProfileTab')).toBe('2');
    });

    it('should set selectedTab to default value and save to localStorage if param is null', () => {
      spyOn(activatedRoute.paramMap, 'subscribe').and.callFake((fn: any) => fn({ get: () => null }));
      component.ngOnInit();
      expect(component.selectedTab).toBe('0');
      expect(localStorage.getItem('selectedTabProfileTab')).toBe('0');
    });
  });

  describe('onTabChange', () => {
    it('should save the tab index to localStorage and navigate to the correct route', () => {
      component.onTabChange(1);
      expect(localStorage.getItem('selectedTabProfileTab')).toBe('1');
      expect(router.navigate).toHaveBeenCalledWith(['home/userProfile', '123', '1']);
    });

    it('should throw error if router navigation fails', () => {
      spyOn(router, 'navigate').and.throwError('Navigation error');
      expect(() => component.onTabChange(1)).toThrowError('Navigation error');
    });
  });
});
