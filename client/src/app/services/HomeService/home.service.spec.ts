import { TestBed } from '@angular/core/testing';
import { HomeService } from './home.service';
import { PostService } from '../PostService/post.service';
import { LeaderBoardService } from '../LeaderBoardService/leader-board.service';
import { Router } from '@angular/router';
import { JwtServiceService } from '../JwtService/jwt-service.service';
import { of, throwError } from 'rxjs';
import {Post} from "../../models/Post";
import {Song} from "../../models/Song";
import {Genre} from "../../models/Genre";
import {Artist} from "../../models/Artist";

// Mocks
const mockPosts: Post[] = [
  { id: 1, title: 'Test Post One', content: 'This is a test', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, image: 'Image', user: { id: 1, username: 'User', email: 'Email', password: 'Password', notifications: [] }, song: { id: 1, image: 'Image', title: 'Title', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, link: 'Link' }, dislikes: [], likes: [] },
  { id: 2, title: 'Test Post Two', content: 'This is a test', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, image: 'Image', user: { id: 1, username: 'User', email: 'Email', password: 'Password', notifications: [] }, song: { id: 1, image: 'Image', title: 'Title', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, link: 'Link' }, dislikes: [], likes: [] }
];
const mockTopSongs: Song[] = [
  { id: 1, image: 'Image One', title: 'Title One', artist: { id: 1, name: 'Artist One', description: 'Description One', image: 'Image One'}, genre: { id: 1, name: 'Genre One', description: 'Description One'}, link: 'Link One'},
  { id: 2, image: 'Image Two', title: 'Title Two', artist: { id: 2, name: 'Artist Two', description: 'Description Two', image: 'Image Two'}, genre: { id: 2, name: 'Genre Two', description: 'Description Two'}, link: 'Link Two'}
];
const mockTopGenres: Genre[] = [
  { id: 1, name: 'Genre One', description: 'Description One' },
  { id: 2, name: 'Genre Two', description: 'Description Two' }
];
const mockTopArtists: Artist[] = [{ id: 1, name: 'Artist One', description: 'Description One', image: 'Image One' }, { id: 2, name: 'Artist Two', description: 'Description Two', image: 'Image Two'}];
const mockRouter = { navigate: jasmine.createSpy('navigate') };
const mockPostService = { getPosts: () => of(mockPosts) };
const mockLeaderBoardService = {
  getLeaderBoardByGenre: () => of(mockTopGenres),
  getLeaderBoardByArtist: () => of(mockTopArtists),
  getLeaderBoardBySong: () => of(mockTopSongs)
};
const mockJwtService = {
  getUserByArtistId: (id: number) => of({ id: id.toString() })
};

describe('HomeService', () => {
  let service: HomeService;
  let postService: PostService;
  let leaderBoardService: LeaderBoardService;
  let router: Router;
  let jwtService: JwtServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HomeService,
        { provide: PostService, useValue: mockPostService },
        { provide: LeaderBoardService, useValue: mockLeaderBoardService },
        { provide: Router, useValue: mockRouter },
        { provide: JwtServiceService, useValue: mockJwtService }
      ]
    });
    service = TestBed.inject(HomeService);
    postService = TestBed.inject(PostService);
    leaderBoardService = TestBed.inject(LeaderBoardService);
    router = TestBed.inject(Router);
    jwtService = TestBed.inject(JwtServiceService);
  });

  it('should return available posts', () => {
    expect(service.getPosts()).toEqual(mockPosts);
  });

  it('should handle no available posts', () => {
    service.posts = [];
    expect(service.getPosts()).toEqual([]);
  });

  it('should load posts and update the posts property', (done: DoneFn) => {
    service.loadPosts();
    expect(service.posts).toEqual(mockPosts.reverse());
    done();
  });

  it('should handle errors when loading posts fails', (done: DoneFn) => {
    spyOn(postService, 'getPosts').and.returnValue(throwError({ status: 500 }));
    service.loadPosts();
    expect(service.posts).toEqual([]);
    done();
  });

  it('should navigate to artist profile when artistId is provided', () => {
    service.gotoArtist(1);
    expect(router.navigate).toHaveBeenCalledWith(['/home/userProfile/1/1']);
  });

  it('should alert and not navigate when artistId is not provided', () => {
    spyOn(window, 'alert');
    service.gotoArtist(undefined);
    expect(window.alert).toHaveBeenCalledWith('Artist not found');
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should return available top songs', () => {
    expect(service.getTopSongs()).toEqual(mockTopSongs);
  });

  it('should handle no available top songs', () => {
    service.topSongs = [];
    expect(service.getTopSongs()).toEqual([]);
  });

  it('should return available top genres', () => {
    expect(service.getTopGenres()).toEqual(mockTopGenres);
  });

  it('should handle no available top genres', () => {
    service.topGenres = [];
    expect(service.getTopGenres()).toEqual([]);
  });

  it('should return available top artists', () => {
    expect(service.getTopArtists()).toEqual(mockTopArtists);
  });

  it('should handle no available top artists', () => {
    service.topArtists = [];
    expect(service.getTopArtists()).toEqual([]);
  });
});
