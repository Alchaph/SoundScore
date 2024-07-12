import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GifService } from './gif.service';
import Expected = jasmine.Expected;
import {Gif} from "../../models/Gif";

describe('GifService', () => {
  let service: GifService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GifService]
    });
    service = TestBed.inject(GifService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('searchGif should return expected data', () => {
    const mockGifData: Expected<Gif> = {
      results: [
        {
          id: 1,
          title: 'Funny Cat',
          media_formats: {
            gif: {
              url: 'https://media.tenor.com/images/1.gif'
            }
          }
        }
      ]
    }
    const searchString = 'funny cat';

    service.searchGif(searchString).subscribe(gif => {
      expect(gif).toEqual(mockGifData);
    });

    const req = httpMock.expectOne(`https://tenor.googleapis.com/v2/search?q=${searchString}&key=${service.tenorKey}&client_key=my_test_app&limit=8`);
    expect(req.request.method).toBe('GET');
    req.flush(mockGifData);
  });
});
