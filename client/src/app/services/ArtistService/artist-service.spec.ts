import { TestBed } from '@angular/core/testing';
import { ArtistService } from './artist.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Artist } from '../../models/Artist';
import { environment } from '../../../environments/environments';
import {HttpService} from "../HttpService/http.service";

describe('ArtistService', () => {
  let service: ArtistService;
  let httpMock: HttpTestingController;
  let httpServiceMock: Partial<HttpService>;

  beforeEach(() => {
    httpServiceMock = {
      getHttpOptions: () => {
        return {
          headers: {
            Authorization: `Bearer null`
          }
        }
      }
    };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArtistService, { provide: HttpService, useValue: httpServiceMock }]
    });
    service = TestBed.inject(ArtistService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('createArtist should post and return the artist', () => {
    const mockArtist: Artist = { id: 1, name: 'New Artist', description: 'Description', image: 'Image'};
    service.createArtist(mockArtist).subscribe(artist => {
      expect(artist).toEqual(mockArtist);
    });

    const req = httpMock.expectOne(`${environment.url}/users/register-artist`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockArtist);
  });

  it('createArtist should throw an error with invalid http Options', () => {
    const mockArtist: Artist = { id: 1, name: 'New Artist', description: 'Description', image: 'Image'};
    service.createArtist(mockArtist).subscribe({
      next: () => fail('Expected to fail due to invalid HTTP options'),
      error: (error) => expect(error).toBeTruthy()
    });

    const req = httpMock.expectOne(`${environment.url}/users/register-artist`);
    expect(req.request.method).toBe('PUT');
    req.error(new ErrorEvent('Unauthorized'), { status: 401 });
  });

  it('updateArtist should put and return the updated artist', () => {
    const mockArtist: Artist = { id: 1, name: 'Updated Artist', description: 'Description', image: 'Image'};
    service.updateArtist(mockArtist).subscribe(artist => {
      expect(artist).toEqual(mockArtist);
    });

    const req = httpMock.expectOne(`${environment.url}/artist`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockArtist);
  });

  it('updateArtist should throw an error with invalid http Options', () => {
    const mockArtist: Artist = { id: 1, name: 'New Artist', description: 'Description', image: 'Image'};
    service.updateArtist(mockArtist).subscribe({
      next: () => fail('Expected to fail due to invalid HTTP options'),
      error: (error) => expect(error).toBeTruthy()
    });

    const req = httpMock.expectOne(`${environment.url}/artist`);
    expect(req.request.method).toBe('PUT');
    req.error(new ErrorEvent('Unauthorized'), { status: 401 });
  });

  it('deleteArtist should delete and return the artist', () => {
    const mockArtist: Artist = { id: 1, name: 'Deleted Artist', description: 'Description', image: 'Image'};
    service.deleteArtist(mockArtist.id!).subscribe(artist => {
      expect(artist).toEqual(mockArtist);
    });

    const req = httpMock.expectOne(`${environment.url}/artist/${mockArtist.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockArtist);
  });

  it('deleteArtist should throw an error with invalid http Options', () => {
    const mockArtist: Artist = { id: 1, name: 'New Artist', description: 'Description', image: 'Image'};
    service.deleteArtist(mockArtist.id!).subscribe({
      next: () => fail('Expected to fail due to invalid HTTP options'),
      error: (error) => expect(error).toBeTruthy()
    });

    const req = httpMock.expectOne(`${environment.url}/artist/${mockArtist.id}`);
    expect(req.request.method).toBe('DELETE');
    req.error(new ErrorEvent('Unauthorized'), { status: 401 });
  });

  it('getArtists should get and return all artists', () => {
    const mockArtists: Artist[] = [{ id: 1, name: 'Artist One', description: 'Description One', image: 'Image One' }, { id: 2, name: 'Artist Two', description: 'Description Two', image: 'Image Two'}];
    service.getArtists().subscribe(artists => {
      expect(artists.length).toBe(2);
      expect(artists).toEqual(mockArtists);
    });

    const req = httpMock.expectOne(`${environment.url}/artist/all`);
    expect(req.request.method).toBe('GET');
    req.flush(mockArtists);
  });

  it('getArtists should throw an error with invalid http Options', () => {
    const mockArtists: Artist[] = [{ id: 1, name: 'Artist One', description: 'Description One', image: 'Image One' }, { id: 2, name: 'Artist Two', description: 'Description Two', image: 'Image Two'}];
    service.getArtists().subscribe({
      next: () => fail('Expected to fail due to invalid HTTP options'),
      error: (error) => expect(error).toBeTruthy()
    });

    const req = httpMock.expectOne(`${environment.url}/artist/all`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Unauthorized'), { status: 401 });
  });

  it('getArtist should get and return a single artist by ID', () => {
    const mockArtist: Artist = { id: 1, name: 'Artist One', description: 'Description One', image: 'Image One'};
    service.getArtist(mockArtist.id!).subscribe(artist => {
      expect(artist).toEqual(mockArtist);
    });

    const req = httpMock.expectOne(`${environment.url}/artist/${mockArtist.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockArtist);
  });

  it('getArtists by ID should throw an error with invalid http Options', () => {
    const mockArtist: Artist = { id: 1, name: 'Artist One', description: 'Description One', image: 'Image One'};
    service.getArtist(mockArtist.id!).subscribe({
      next: () => fail('Expected to fail due to invalid HTTP options'),
      error: (error) => expect(error).toBeTruthy()
    });

    const req = httpMock.expectOne(`${environment.url}/artist/${mockArtist.id}`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Unauthorized'), { status: 401 });
  });

});
