import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LeaderBoardComponent } from './leader-board.component';
import { LeaderBoardService } from '../../services/LeaderBoardService/leader-board.service';
import { HomeService } from '../../services/HomeService/home.service';
import { of, throwError } from 'rxjs';
import { Post } from '../../models/Post';
import { Artist } from '../../models/Artist';
import { Song } from '../../models/Song';
import { Genre } from '../../models/Genre';
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {HttpClientModule} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

describe('LeaderBoardComponent', () => {
  let component: LeaderBoardComponent;
  let fixture: ComponentFixture<LeaderBoardComponent>;
  let leaderBoardService: jasmine.SpyObj<LeaderBoardService>;
  let homeService: jasmine.SpyObj<HomeService>;
  let mockActivatedRoute = { snapshot: { paramMap: { get: () => '1' } } };


  let LeaderBoardComponentMock: Partial<LeaderBoardComponent>;

  beforeEach(() => {
    LeaderBoardComponentMock = {
      openLink: jasmine.createSpy('openLink'),
      gotoArtist: jasmine.createSpy('gotoArtist')
    };
    const leaderBoardSpy = jasmine.createSpyObj('LeaderBoardService', ['getLeaderBoard', 'getLeaderBoardByArtist', 'getLeaderBoardBySong', 'getLeaderBoardByGenre']);
    const homeSpy = jasmine.createSpyObj('HomeService', ['gotoArtist']);

    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, TranslateModule.forRoot(), HttpClientModule ],
      providers: [
        { provide: LeaderBoardService, useValue: leaderBoardSpy },
        { provide: HomeService, useValue: homeSpy },
        { provide: LeaderBoardComponent, useValue: LeaderBoardComponentMock },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LeaderBoardComponent);
    component = fixture.componentInstance;
    leaderBoardService = TestBed.inject(LeaderBoardService) as jasmine.SpyObj<LeaderBoardService>;
    homeService = TestBed.inject(HomeService) as jasmine.SpyObj<HomeService>;
  });

  it('should fetch and populate leaderboards on init (positive test)', () => {
    const posts: Post[] = [{ id: 1, title: 'Post 1', content: 'Content 1', image: 'Image 1', user: { id: 1, username: 'User 1', email: 'Email 1', password: 'Password 1', notifications: [] }, artist: { id: 1, name: 'Artist 1', description: 'Description 1', image: 'Image 1' }, genre: { id: 1, name: 'Genre 1', description: 'Description 1' }, song: { id: 1, title: 'Song 1', image: 'Image 1', artist: { id: 1, name: 'Artist 1', description: 'Description 1', image: 'Image 1' }, genre: { id: 1, name: 'Genre 1', description: 'Description 1' }, link: 'Link 1' }, likes: [], dislikes: [] }];
    const artists: Artist[] = [{ id: 1, name: 'Artist 1', description: 'Description 1', image: 'Image 1' }, { id: 2, name: 'Artist 2', description: 'Description 2', image: 'Image 2' }];
    const songs: Song[] = [{ id: 1, title: 'Song 1', image: 'Image 1', artist: { id: 1, name: 'Artist 1', description: 'Description 1', image: 'Image 1' }, genre: { id: 1, name: 'Genre 1', description: 'Description 1' }, link: 'Link 1' }];
    const genres: Genre[] = [{ id: 1, name: 'Genre 1', description: 'Description 1' }, { id: 2, name: 'Genre 2', description: 'Description 2' }];

    leaderBoardService.getLeaderBoard.and.returnValue(of(posts));
    leaderBoardService.getLeaderBoardByArtist.and.returnValue(of(artists));
    leaderBoardService.getLeaderBoardBySong.and.returnValue(of(songs));
    leaderBoardService.getLeaderBoardByGenre.and.returnValue(of(genres));

    component.ngOnInit();

    expect(component.overallLeaderBoard).toEqual(posts);
    expect(component.artistLeaderBoard).toEqual(Array.from(new Set(artists)));
    expect(component.songLeaderBoard).toEqual(Array.from(new Set(songs)));
    expect(component.genreLeaderBoard).toEqual(Array.from(new Set(genres)));
  });

  it('should handle errors during fetching leaderboards (negative test)', () => {
    leaderBoardService.getLeaderBoard.and.returnValue(of([]));
    leaderBoardService.getLeaderBoardByArtist.and.returnValue(of([]));
    leaderBoardService.getLeaderBoardBySong.and.returnValue(of([]));
    leaderBoardService.getLeaderBoardByGenre.and.returnValue(of([]));

    component.ngOnInit();

    expect(component.overallLeaderBoard).toEqual([]);
    expect(component.artistLeaderBoard).toEqual([]);
    expect(component.songLeaderBoard).toEqual([]);
    expect(component.genreLeaderBoard).toEqual([]);
  });

  it('should open a new tab with the provided link (positive test)', () => {
    spyOn(window, 'open');

    component.openLink('http://example.com');

    expect(window.open).toHaveBeenCalledWith('http://example.com', '_blank');
  });

  it('should not open a new tab when the link is undefined (negative test)', () => {
    spyOn(window, 'open');

    component.openLink(undefined);

    expect(window.open).not.toHaveBeenCalled();
  });

  it('should navigate to artist page with the provided id (positive test)', () => {
    component.gotoArtist(1);

    expect(homeService.gotoArtist).toHaveBeenCalledWith(1);
  });

  it('should not navigate to artist page when the id is undefined (negative test)', () => {
    component.gotoArtist(undefined);

    expect(homeService.gotoArtist).not.toHaveBeenCalled();
  });
});
