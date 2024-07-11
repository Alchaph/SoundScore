import { TestBed } from '@angular/core/testing';
import { ArtistService } from './artist.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Artist } from '../../models/Artist';
import { environment } from '../../../environments/environments';

describe('ArtistService', () => {
  let service: ArtistService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArtistService]
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

    const req = httpMock.expectOne(`${environment.url}/artist`);
    expect(req.request.method).toBe('POST');
    req.flush(mockArtist);
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

  it('deleteArtist should delete and return the artist', () => {
    const mockArtist: Artist = { id: 1, name: 'Deleted Artist', description: 'Description', image: 'Image'};
    service.deleteArtist(mockArtist.id!).subscribe(artist => {
      expect(artist).toEqual(mockArtist);
    });

    const req = httpMock.expectOne(`${environment.url}/artist/${mockArtist.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockArtist);
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

  it('getArtist should get and return a single artist by ID', () => {
    const mockArtist: Artist = { id: 1, name: 'Artist One', description: 'Description One', image: 'Image One'};
    service.getArtist(mockArtist.id!).subscribe(artist => {
      expect(artist).toEqual(mockArtist);
    });

    const req = httpMock.expectOne(`${environment.url}/artist/${mockArtist.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockArtist);
  });
});
