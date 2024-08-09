import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeMobileComponent } from './home-mobile.component';
import { HomeService } from '../../../services/HomeService/home.service';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import { PostService } from '../../../services/PostService/post.service';
import { JwtService } from '../../../services/JwtService/jwt.service';
import { of, throwError } from 'rxjs';
import { User } from '../../../models/User';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TranslateModule} from "@ngx-translate/core";
import {ActivatedRoute} from "@angular/router";

describe('HomeMobileComponent', () => {
  let component: HomeMobileComponent;
  let fixture: ComponentFixture<HomeMobileComponent>;
  let mockHomeService = {
    gotoArtist: jasmine.createSpy('gotoArtist'),
    loadPosts: jasmine.createSpy('loadPosts'),
    getPosts: jasmine.createSpy('getPosts').and.returnValue([]),
    getTopArtists: jasmine.createSpy('getTopArtists').and.returnValue([]),
    getTopSongs: jasmine.createSpy('getTopSongs').and.returnValue([]),
    getTopGenres: jasmine.createSpy('getTopGenres').and.returnValue([])
  }
  let mockBreakpointObserver = {
    observe: jasmine.createSpy('observe').and.returnValue(of({ matches: true } as BreakpointState))
  }
  let mockPostService = {
    likePost: jasmine.createSpy('likePost'),
    dislikePost: jasmine.createSpy('dislikePost')
  }
  let mockJwtService = {
    getMe: jasmine.createSpy('getMe').and.returnValue(of({id: 1} as User)),
  }

  let routeMock = { snapshot: { paramMap: { get: jasmine.createSpy('get').and.returnValue('1') } } };

  let HomeMobileComponentMock: Partial<HomeMobileComponent>;

  beforeEach(async () => {
    HomeMobileComponentMock = {
      selected: jasmine.createSpy('selected'),
      handlePanelClick: jasmine.createSpy('handlePanelClick'),
      openLink: jasmine.createSpy('openLink'),
      gotoArtist: jasmine.createSpy('gotoArtist')
    };

    await TestBed.configureTestingModule({
    imports: [HttpClientModule, FormsModule, BrowserAnimationsModule, TranslateModule.forRoot()],
      providers: [
        { provide: HomeService, useValue: mockHomeService },
        { provide: BreakpointObserver, useValue: mockBreakpointObserver },
        { provide: PostService, useValue: mockPostService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: HomeMobileComponent, useValue: HomeMobileComponentMock },
        { provide: ActivatedRoute, useValue: routeMock }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set isMobile to true when breakpoint matches', () => {
      mockBreakpointObserver.observe.and.returnValue(of({ matches: true } as BreakpointState));
      mockJwtService.getMe.and.returnValue(of({} as User));
      component.ngOnInit();
      expect(component.isMobile).toBeTrue();
    });

    it('should handle error when getMe fails', () => {
      mockBreakpointObserver.observe.and.returnValue(of({ matches: false } as BreakpointState));
      mockJwtService.getMe.and.returnValue(of({undefined} as unknown as User));
      component.ngOnInit();
      expect(component.activeUser).toEqual({undefined} as unknown as User);
    });
  });

  describe('selected', () => {
    it('should set selectedFilters to the correct value', () => {
      component.selected('genre');
      expect(component.selectedFilters).toBe('genre');
    });

    it('should not set selectedFilters to an invalid value', () => {
      component.selected(undefined as unknown as string);
      expect(component.selectedFilters).toBeUndefined();
    });
  });

  describe('handlePanelClick', () => {
    it('should stop event propagation', () => {
      const event = new MouseEvent('click');
      spyOn(event, 'stopPropagation');
      component.handlePanelClick(event);
      expect(event.stopPropagation).toHaveBeenCalled();
    });
  });

  describe('openLink', () => {
    it('should open the link in a new tab', () => {
      const event = new MouseEvent('click');
      spyOn(event, 'stopPropagation');
      spyOn(window, 'open');
      component.openLink(event, 'http://example.com');
      expect(event.stopPropagation).toHaveBeenCalled();
      expect(window.open).toHaveBeenCalledWith('http://example.com', '_blank');
    });

    it('should not open a link if the link is null', () => {
      spyOn(window, 'open');
      component.openLink(new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        clientX: 100,
        clientY: 200
      }), null as unknown as string);
      expect(window.open).not.toHaveBeenCalled();
    });
  });

  describe('gotoArtist', () => {
    it('should call homeService.gotoArtist with the correct artistId', () => {
      component.gotoArtist(123);
      expect(mockHomeService.gotoArtist).toHaveBeenCalledWith(123);
    });

    it('should handle undefined artistId gracefully', () => {
      component.gotoArtist(undefined);
      expect(mockHomeService.gotoArtist).toHaveBeenCalledWith(undefined);
    });
  });
});
