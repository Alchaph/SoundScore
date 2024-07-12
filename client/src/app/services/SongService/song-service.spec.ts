import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../../environments/environments';
import {SongService} from "./song.service";
import {Song} from "../../models/Song";
import {Artist} from "../../models/Artist";
import {Genre} from "../../models/Genre";

describe('SongService', () => {
  let service: SongService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SongService]
    });
    service = TestBed.inject(SongService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('createEditSong should post or update and return the song', () => {
    const mockSong: Song = { id: 1, image: 'Image', title: 'Title', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image'}, genre: { id: 1, name: 'Genre', description: 'Description'}, link: 'Link'};
    service.createEditSong(mockSong).subscribe(song => {
      expect(song).toEqual(mockSong);
    });

    const req = httpMock.expectOne(`${environment.url}/songs`);
    expect(req.request.method).toBe('POST');
    req.flush(mockSong);
  });

  it('createEditSong should throw an error with invalid http Options', () => {
    const mockSong: Song = { id: 1, image: 'Image', title: 'Title', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image'}, genre: { id: 1, name: 'Genre', description: 'Description'}, link: 'Link'};
    service.createEditSong(mockSong).subscribe({
      next: () => fail('Expected to fail due to invalid HTTP options'),
      error: (error) => expect(error).toBeTruthy()
    });

    const req = httpMock.expectOne(`${environment.url}/songs`);
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('Unauthorized'), { status: 401 });
  });

  it('deleteSong should delete and return the song', () => {
    const mockSong: Song = { id: 1, image: 'Image', title: 'Title', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image'}, genre: { id: 1, name: 'Genre', description: 'Description'}, link: 'Link'};
    service.deleteSong(mockSong.id!).subscribe(song => {
      expect(song).toEqual(mockSong);
    });

    const req = httpMock.expectOne(`${environment.url}/songs/${mockSong.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockSong);
  });

  it('deleteSong should throw an error with invalid http Options', () => {
    const mockSong: Song = { id: 1, image: 'Image', title: 'Title', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image'}, genre: { id: 1, name: 'Genre', description: 'Description'}, link: 'Link'};
    service.deleteSong(mockSong.id!).subscribe({
      next: () => fail('Expected to fail due to invalid HTTP options'),
      error: (error) => expect(error).toBeTruthy()
    });

    const req = httpMock.expectOne(`${environment.url}/songs/${mockSong.id}`);
    expect(req.request.method).toBe('DELETE');
    req.error(new ErrorEvent('Unauthorized'), { status: 401 });
  });

  it('getSongs should get and return all songs', () => {
    const mockSongs: Song[] = [
      { id: 1, image: 'Image One', title: 'Title One', artist: { id: 1, name: 'Artist One', description: 'Description One', image: 'Image One'}, genre: { id: 1, name: 'Genre One', description: 'Description One'}, link: 'Link One'},
      { id: 2, image: 'Image Two', title: 'Title Two', artist: { id: 2, name: 'Artist Two', description: 'Description Two', image: 'Image Two'}, genre: { id: 2, name: 'Genre Two', description: 'Description Two'}, link: 'Link Two'}
    ];
    service.getSongs().subscribe(song => {
      expect(song.length).toBe(2);
      expect(song).toEqual(mockSongs);
    });

    const req = httpMock.expectOne(`${environment.url}/songs/all`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSongs);
  });

  it('getSongs should throw an error with invalid http Options', () => {
    const mockSongs: Song[] = [
      { id: 1, image: 'Image One', title: 'Title One', artist: { id: 1, name: 'Artist One', description: 'Description One', image: 'Image One'}, genre: { id: 1, name: 'Genre One', description: 'Description One'}, link: 'Link One'},
      { id: 2, image: 'Image Two', title: 'Title Two', artist: { id: 2, name: 'Artist Two', description: 'Description Two', image: 'Image Two'}, genre: { id: 2, name: 'Genre Two', description: 'Description Two'}, link: 'Link Two'}
    ];
    service.getSongs().subscribe({
      next: () => fail('Expected to fail due to invalid HTTP options'),
      error: (error) => expect(error).toBeTruthy()
    });

    const req = httpMock.expectOne(`${environment.url}/songs/all`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Unauthorized'), { status: 401 });
  });

  it('getSong should get and return a single artist by ID', () => {
    const mockSong: Song = { id: 1, image: 'Image', title: 'Title', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image'}, genre: { id: 1, name: 'Genre', description: 'Description'}, link: 'Link'};
    service.getSong(mockSong.id!).subscribe(song => {
      expect(song).toEqual(mockSong);
    });

    const req = httpMock.expectOne(`${environment.url}/songs/${mockSong.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSong);
  });

  it('getSong should throw an error with invalid http Options', () => {
    const mockSong: Song = { id: 1, image: 'Image', title: 'Title', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image'}, genre: { id: 1, name: 'Genre', description: 'Description'}, link: 'Link'};
    service.getSong(mockSong.id!).subscribe({
      next: () => fail('Expected to fail due to invalid HTTP options'),
      error: (error) => expect(error).toBeTruthy()
    });

    const req = httpMock.expectOne(`${environment.url}/songs/${mockSong.id}`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Unauthorized'), { status: 401 });
  });
});
