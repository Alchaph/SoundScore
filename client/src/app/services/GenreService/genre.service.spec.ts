import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GenreService } from './genre.service';
import { environment } from '../../../environments/environments';
import { Genre } from '../../models/Genre';
import {HttpService} from "../HttpService/http.service";

describe('GenreService', () => {
  let service: GenreService;
  let httpMock: HttpTestingController;
  let httpServiceMock: Partial<HttpService>;

  beforeEach(() => {
    httpServiceMock = {
      getHttpOptions: () => {
        return {
          headers: {
            Authorization: 'Bearer null'
          }
        }
      }
    };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GenreService, { provide: HttpService, useValue: httpServiceMock }]
    });
    service = TestBed.inject(GenreService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('getGenres should return an Genres', () => {
    const mockGenres: Genre[] = [
      { id: 1, name: 'Genre One', description: 'Description One' },
      { id: 2, name: 'Genre Two', description: 'Description Two' }
    ];

    service.getGenres().subscribe(genres => {
      expect(genres.length).toBe(2);
      expect(genres).toEqual(mockGenres);
    });

    const req = httpMock.expectOne(`${environment.url}/genres/all`);
    expect(req.request.method).toBe('GET');
    req.flush(mockGenres);
  });

  it('getGenres should throw an error with invalid http Options', () => {
    service.getGenres().subscribe({
      next: () => fail('Expected to fail due to invalid HTTP options'),
      error: (error) => expect(error).toBeTruthy()
    });

    const req = httpMock.expectOne(`${environment.url}/genres/all`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Unauthorized'), { status: 401 });
  });
});
