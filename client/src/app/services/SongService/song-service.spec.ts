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

  it('createSong should post and return the song', () => {
    const mockSong: Song = { id: 1, image: 'Image', title: 'Title', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image'}, genre: { id: 1, name: 'Genre', description: 'Description'}, link: 'Link'};
    service.createEditSong(mockSong).subscribe(song => {
      expect(song).toEqual(mockSong);
    });

    const req = httpMock.expectOne(`${environment.url}/songs`);
    expect(req.request.method).toBe('POST');
    req.flush(mockSong);
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

  it('getArtist should get and return a single artist by ID', () => {
    const mockSong: Song = { id: 1, image: 'Image', title: 'Title', artist: { id: 1, name: 'Artist', description: 'Description', image: 'Image'}, genre: { id: 1, name: 'Genre', description: 'Description'}, link: 'Link'};
    service.getSong(mockSong.id!).subscribe(song => {
      expect(song).toEqual(mockSong);
    });

    const req = httpMock.expectOne(`${environment.url}/songs/${mockSong.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSong);
  });
});
