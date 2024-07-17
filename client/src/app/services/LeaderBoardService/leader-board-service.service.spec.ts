import { TestBed } from '@angular/core/testing';

import { LeaderBoardService } from './leader-board.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "../../../environments/environments";
import {Post} from "../../models/Post";
import {Genre} from "../../models/Genre";
import {Artist} from "../../models/Artist";
import {Song} from "../../models/Song";

describe('LeaderBoardServiceService', () => {
  let service: LeaderBoardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LeaderBoardService]
    });
    service = TestBed.inject(LeaderBoardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('getLeaderBoard should return same objects as mock', () => {
    const mockLeaderBoard: Post[] = [
      { id: 1, title: 'Test Post One', content: 'This is a test', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, image: 'Image', user: { id: 1, username: 'User', email: 'Email', password: 'Password', notifications: [] }, song: { id: 1, image: 'Image', title: 'Title', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, link: 'Link' }, dislikes: [], likes: [] },
      { id: 2, title: 'Test Post Two', content: 'This is a test', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, image: 'Image', user: { id: 1, username: 'User', email: 'Email', password: 'Password', notifications: [] }, song: { id: 1, image: 'Image', title: 'Title', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, link: 'Link' }, dislikes: [], likes: [] }
    ];    service.getLeaderBoard().subscribe(leaderBoard => {
      expect(leaderBoard).toEqual(mockLeaderBoard);
    });

    const req = httpMock.expectOne(`${environment.url}/leaderboard/all`);
    expect(req.request.method).toBe('GET');
    req.flush(mockLeaderBoard);
  });

  it('getLeaderBoard should throw an error with invalid http Options', () => {
    service.getLeaderBoard().subscribe({
      next: () => fail('Expected to fail due to invalid HTTP options'),
      error: (error) => expect(error).toBeTruthy()
    });

    const req = httpMock.expectOne(`${environment.url}/leaderboard/all`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Unauthorized'), { status: 401 });
  });

  it('getLeaderBoardByGenre should return same objects as mock', () => {
     const mockLeaderBoard: Genre[] = [
      { id: 1, name: 'Genre', description: 'Description' },
      { id: 2, name: 'Genre', description: 'Description' }
       ];
      service.getLeaderBoardByGenre().subscribe(leaderBoard => {
      expect(leaderBoard).toEqual(mockLeaderBoard);
    });

    const req = httpMock.expectOne(`${environment.url}/leaderboard/genre`);
    expect(req.request.method).toBe('GET');
    req.flush(mockLeaderBoard);
  });

  it('getLeaderBoardByGenre should throw an error with invalid http Options', () => {
    service.getLeaderBoardByGenre().subscribe({
      next: () => fail('Expected to fail due to invalid HTTP options'),
      error: (error) => expect(error).toBeTruthy()
    });

    const req = httpMock.expectOne(`${environment.url}/leaderboard/genre`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Unauthorized'), { status: 401 });
  });

  it('getLeaderBoardByArtist should return same objects as mock', () => {
    const mockLeaderBoard: Artist[] = [
      { id: 1, name: 'Artist', description: 'Description', image: 'Image' },
      { id: 2, name: 'Artist', description: 'Description', image: 'Image' }
    ];
    service.getLeaderBoardByArtist().subscribe(leaderBoard => {
      expect(leaderBoard).toEqual(mockLeaderBoard);
    });

    const req = httpMock.expectOne(`${environment.url}/leaderboard/artist`);
    expect(req.request.method).toBe('GET');
    req.flush(mockLeaderBoard);
  });

  it('getLeaderBoardByArtist should throw an error with invalid http Options', () => {
    service.getLeaderBoardByArtist().subscribe({
      next: () => fail('Expected to fail due to invalid HTTP options'),
      error: (error) => expect(error).toBeTruthy()
    });

    const req = httpMock.expectOne(`${environment.url}/leaderboard/artist`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Unauthorized'), { status: 401 });
  });

  it('getLeaderBoardBySong should return same objects as mock', () => {
    const mockLeaderBoard: Song[] = [
      { id: 1, image: 'Image', title: 'Title', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, link: 'Link' },
      { id: 2, image: 'Image', title: 'Title', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image' }, genre: { id: 1, name: 'Genre', description: 'Description' }, link: 'Link' }
    ];
    service.getLeaderBoardBySong().subscribe(leaderBoard => {
      expect(leaderBoard).toEqual(mockLeaderBoard);
    });

    const req = httpMock.expectOne(`${environment.url}/leaderboard/song`);
    expect(req.request.method).toBe('GET');
    req.flush(mockLeaderBoard);
  });

  it('getLeaderBoardBySong should throw an error with invalid http Options', () => {
    service.getLeaderBoardBySong().subscribe({
      next: () => fail('Expected to fail due to invalid HTTP options'),
      error: (error) => expect(error).toBeTruthy()
    });

    const req = httpMock.expectOne(`${environment.url}/leaderboard/song`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Unauthorized'), { status: 401 });
  });
});
