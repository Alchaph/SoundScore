import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HomeService } from '../../services/HomeService/home.service';
import { JwtService } from '../../services/JwtService/jwt.service';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import { of } from 'rxjs';
import {User} from "../../models/User";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {HttpClientModule} from "@angular/common/http";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let homeService: jasmine.SpyObj<HomeService>;
  let jwtService: jasmine.SpyObj<JwtService>;
  let breakpointObserver: jasmine.SpyObj<BreakpointObserver>;

  let HomeComponentMock: Partial<HomeComponent>;

  beforeEach(async () => {
    HomeComponentMock = {
      gotoArtist: jasmine.createSpy('gotoArtist'),
      ngOnInit: jasmine.createSpy('ngOnInit')
    };
    const homeServiceSpy = jasmine.createSpyObj('HomeService', ['loadPosts', 'gotoArtist']);
    const jwtServiceSpy = jasmine.createSpyObj('JwtServiceService', ['getMe']);
    const breakpointObserverSpy = jasmine.createSpyObj('BreakpointObserver', ['observe']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TranslateModule.forRoot(), HttpClientModule],
      providers: [
        { provide: HomeService, useValue: homeServiceSpy },
        { provide: JwtService, useValue: jwtServiceSpy },
        { provide: BreakpointObserver, useValue: breakpointObserverSpy },
        { provide: HomeComponent, useValue: HomeComponentMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    homeService = TestBed.inject(HomeService) as jasmine.SpyObj<HomeService>;
    jwtService = TestBed.inject(JwtService) as jasmine.SpyObj<JwtService>;
    breakpointObserver = TestBed.inject(BreakpointObserver) as jasmine.SpyObj<BreakpointObserver>;

    jwtService.getMe.and.returnValue(of({ id: 1, name: 'Test User', password: 'password', notifications: [] }as unknown as User));
    breakpointObserver.observe.and.returnValue(of({ matches: true } as BreakpointState));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should set isMobile to true if viewport matches small or xsmall', () => {
      component.ngOnInit();
      expect(component.isMobile).toBeTrue();
    });

    it('should set activeUser and load posts', () => {
      component.ngOnInit();
      expect(component.activeUser).toEqual({ id: 1, name: 'Test User', password: 'password', notifications: [] }as unknown as User);
      expect(homeService.loadPosts).toHaveBeenCalled();
    });

    it('should not set isMobile if viewport does not match small or xsmall', () => {
      breakpointObserver.observe.and.returnValue(of({ matches: false } as BreakpointState));
      component.ngOnInit();
      expect(component.isMobile).toBeFalse();
    });

    it('should handle error if getMe fails', () => {
      jwtService.getMe.and.returnValue(of({ id: null, name: null }as unknown as User));
      component.ngOnInit();
      expect(component.activeUser).toEqual({ id: null, name: null }as unknown as User);
    });
  });

  describe('#gotoArtist', () => {
    it('should call homeService.gotoArtist with the provided id', () => {
      const id = 1;
      component.gotoArtist(id);
      expect(homeService.gotoArtist).toHaveBeenCalledWith(id);
    });

    it('should handle undefined id', () => {
      component.gotoArtist(undefined);
      expect(homeService.gotoArtist).toHaveBeenCalledWith(undefined);
    });
  });
});
