import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { PostService } from '../../services/PostService/post.service';
import { JwtServiceService } from '../../services/JwtService/jwt-service.service';
import { SongService } from '../../services/SongService/song.service';
import { ArtistService } from '../../services/ArtistService/artist.service';
import { HomeService } from '../../services/HomeService/home.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { of, throwError } from 'rxjs';
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {HttpClientModule} from "@angular/common/http";
import {Post} from "../../models/Post";
import {User} from "../../models/User";
import {Artist} from "../../models/Artist";
import {Song} from "../../models/Song";
import {ActivatedRoute} from "@angular/router";

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let postService: jasmine.SpyObj<PostService>;
  let jwtService: jasmine.SpyObj<JwtServiceService>;
  let songService: jasmine.SpyObj<SongService>;
  let artistService: jasmine.SpyObj<ArtistService>;
  let homeService: jasmine.SpyObj<HomeService>;
  let breakpointObserver: jasmine.SpyObj<BreakpointObserver>;

  let routeMock = {
    snapshot: {
      paramMap: {
        get: jasmine.createSpy('get').and.returnValue('1')
      }
    }
  }

  let searchComponentMock: Partial<SearchComponent>;

  beforeEach(async () => {
    searchComponentMock = {
      openLink: jasmine.createSpy('openLink'),
      search: jasmine.createSpy('search'),
      gotoArtist: jasmine.createSpy('gotoArtist'),
    };
    const postServiceSpy = jasmine.createSpyObj('PostService', ['getPosts']);
    const jwtServiceSpy = jasmine.createSpyObj('JwtServiceService', ['getUsers']);
    const songServiceSpy = jasmine.createSpyObj('SongService', ['getSongs']);
    const artistServiceSpy = jasmine.createSpyObj('ArtistService', ['getArtists']);
    const homeServiceSpy = jasmine.createSpyObj('HomeService', ['gotoArtist']);
    const breakpointObserverSpy = jasmine.createSpyObj('BreakpointObserver', ['observe']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TranslateModule.forRoot(), HttpClientModule],
      providers: [
        {provide: PostService, useValue: postServiceSpy},
        {provide: JwtServiceService, useValue: jwtServiceSpy},
        {provide: SongService, useValue: songServiceSpy},
        {provide: ArtistService, useValue: artistServiceSpy},
        {provide: HomeService, useValue: homeServiceSpy},
        {provide: BreakpointObserver, useValue: breakpointObserverSpy},
        {provide: SearchComponent, useValue: searchComponentMock },
        {provide: ActivatedRoute, useValue: routeMock}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
    jwtService = TestBed.inject(JwtServiceService) as jasmine.SpyObj<JwtServiceService>;
    songService = TestBed.inject(SongService) as jasmine.SpyObj<SongService>;
    artistService = TestBed.inject(ArtistService) as jasmine.SpyObj<ArtistService>;
    homeService = TestBed.inject(HomeService) as jasmine.SpyObj<HomeService>;
    breakpointObserver = TestBed.inject(BreakpointObserver) as jasmine.SpyObj<BreakpointObserver>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set isMobile to true when breakpoint matches', () => {
      const breakpointResult = { matches: true, breakpoints: {} };
      breakpointObserver.observe.and.returnValue(of(breakpointResult));

      component.ngOnInit();

      expect(component.isMobile).toBeTrue();
    });

    it('should set isMobile to false when breakpoint does not match', () => {
      const breakpointResult = { matches: false, breakpoints: {} };
      breakpointObserver.observe.and.returnValue(of(breakpointResult));

      component.ngOnInit();

      expect(component.isMobile).toBeFalse();
    });

    //TODO Breakpointobserver is undefined
    // it('should load data successfully', () => {
    //   const posts: Post[] = [{dislikes: [], image: "", likes: [], user: {id: 1, username: 'username', password: 'password', notifications: [], email: 'email'}, id: 1, content: 'Post content', title: 'Post title' }];
    //   const users: User[] = [{id: 1, username: 'username', password: 'password', notifications: [], email: 'email'}];
    //   const songs: Song[] = [{artist: {id: 1, description: 'description', name: 'name', image: 'image'}, genre: {id: 1, description: 'description', name: 'name'}, image: "", id: 1, title: 'Song title', link: 'Song link' }];
    //   const artists: Artist[] = [{image: "image", id: 1, description: 'Artist description', name: 'Artist name' }];
    //
    //   postService.getPosts.and.returnValue(of(posts));
    //   jwtService.getUsers.and.returnValue(of(users));
    //   songService.getSongs.and.returnValue(of(songs));
    //   artistService.getArtists.and.returnValue(of(artists));
    //
    //   component.ngOnInit();
    //
    //   expect(component.posts).toEqual(posts.reverse());
    //   expect(component.users).toEqual(users);
    //   expect(component.songs).toEqual(songs);
    //   expect(component.artists).toEqual(artists);
    // });

    //TODO Breakpoint observer is undefined
    // it('should handle error when loading data', () => {
    //   postService.getPosts.and.returnValue(of([]));
    //   jwtService.getUsers.and.returnValue(of([]));
    //   songService.getSongs.and.returnValue(of([]));
    //   artistService.getArtists.and.returnValue(of([]));
    //
    //   spyOn(console, 'error');
    //
    //   component.ngOnInit();
    //
    //   expect(console.error).toHaveBeenCalledWith('Error occurred:', 'Error loading posts');
    // });
  });

  describe('openLink', () => {
    it('should open link in new tab', () => {
      spyOn(window, 'open');
      const event = new MouseEvent('click');

      component.openLink(event, 'http://example.com');

      expect(window.open).toHaveBeenCalledWith('http://example.com', '_blank');
    });

    it('should not open link if link is empty', () => {
      spyOn(window, 'open');
      const event = new MouseEvent('click');

      component.openLink(event, '');

      expect(window.open).not.toHaveBeenCalled();
    });
  });

  describe('type guards', () => {
    it('should identify Post type', () => {
      const post: Post = {dislikes: [], image: "", likes: [], user: {
          id: 1, username: 'username', password: 'password', notifications: [], email: 'email',
          premium: false,
          followers: []
        }, id: 1, content: 'Post content', title: 'Post title' };
      expect(component.isPost(post)).toBeTrue();
    });

    it('should not identify Post type if content is missing', () => {
      const notPost: any = { id: 1, title: 'Title only' };
      expect(component.isPost(notPost)).toBeFalse();
    });

    it('should identify User type', () => {
      const user: User = {
        followers: [],
        premium: false, id: 1, username: 'username', password: 'password', notifications: [], email: 'email'};
      expect(component.isUser(user)).toBeTrue();
    });

    it('should not identify User type if email is missing', () => {
      const notUser: any = { id: 1, username: 'user' };
      expect(component.isUser(notUser)).toBeFalse();
    });

    it('should identify Artist type', () => {
      const artist: Artist = {image: "image", id: 1, description: 'Artist description', name: 'Artist name' };
      expect(component.isArtist(artist)).toBeTrue();
    });

    it('should not identify Artist type if description is missing', () => {
      const notArtist: any = { id: 1, name: 'Artist name' };
      expect(component.isArtist(notArtist)).toBeFalse();
    });

    it('should identify Song type', () => {
      const song: Song = {artist: {id: 1, description: 'description', name: 'name', image: 'image'}, genre: {id: 1, description: 'description', name: 'name'}, image: "", id: 1, title: 'Song title', link: 'Song link' };
      expect(component.isSong(song)).toBeTrue();
    });

    it('should not identify Song type if link is missing', () => {
      const notSong: any = { id: 1, title: 'Song title' };
      expect(component.isSong(notSong)).toBeFalse();
    });
  });

  describe('search', () => {
    beforeEach(() => {
      component.posts = [{dislikes: [], image: "", likes: [], user: {
          id: 1, username: 'username', password: 'password', notifications: [], email: 'email',
          premium: false,
          followers: []
        }, id: 1, content: 'Post content', title: 'Post title' }];
      component.users = [{id: 1, username: 'username', password: 'password', notifications: [], email: 'email', premium: false, followers: [] }];
      component.songs = [{artist: {id: 1, description: 'description', name: 'name', image: 'image'}, genre: {id: 1, description: 'description', name: 'name'}, image: "", id: 1, title: 'Song title', link: 'Song link' }];
      component.artists = [{image: "image", id: 1, description: 'Artist description', name: 'Artist name' }];
      component.combinedList = [...component.posts, ...component.users, ...component.songs, ...component.artists];
    });

    it('should filter combinedList by searchTerm for Post', () => {
      component.searchTerm = 'Post';
      component.search();

      expect(component.combinedList.length).toBe(1);
      expect(component.combinedList[0]).toEqual(jasmine.objectContaining({ title: 'Post title' }));
    });

    it('should filter combinedList by searchTerm for User', () => {
      component.searchTerm = 'user';
      component.search();

      expect(component.combinedList.length).toBe(1);
      expect(component.combinedList[0]).toEqual(jasmine.objectContaining({ username: 'username' }));
    });

    it('should filter combinedList by searchTerm for Artist', () => {
      component.searchTerm = 'Artist';
      component.search();

      expect(component.combinedList.length).toBe(1);
      expect(component.combinedList[0]).toEqual(jasmine.objectContaining({ name: 'Artist name' }));
    });

    it('should filter combinedList by searchTerm for Song', () => {
      component.searchTerm = 'Song';
      component.search();

      expect(component.combinedList.length).toBe(1);
      expect(component.combinedList[0]).toEqual(jasmine.objectContaining({ title: 'Song title' }));
    });

    it('should not find any items if searchTerm does not match', () => {
      component.searchTerm = 'Nonexistent';
      component.search();

      expect(component.combinedList.length).toBe(0);
    });
  });

  describe('gotoArtist', () => {
    it('should call homeService.gotoArtist with correct id', () => {
      const artistId = 1;

      component.gotoArtist(artistId);

      expect(homeService.gotoArtist).toHaveBeenCalledWith(artistId);
    });

    it('should not call homeService.gotoArtist if id is undefined', () => {
      component.gotoArtist(undefined);

      expect(homeService.gotoArtist).not.toHaveBeenCalled();
    });
  });
});
