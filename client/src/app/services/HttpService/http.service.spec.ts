import { TestBed } from '@angular/core/testing';
import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpService]
    });
    service = TestBed.inject(HttpService);
  });

  it('should return headers with Authorization if token is present', () => {
    const token = 'test-token';
    spyOn(localStorage, 'getItem').and.returnValue(token);
    const expectedHeaders = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    expect(service.getHttpOptions()).toEqual(expectedHeaders);
  });

  it('should return empty headers object if token is not present', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const expectedHeaders = {
      headers: {}
    };
    expect(service.getHttpOptions()).toEqual(expectedHeaders);
  });
});
