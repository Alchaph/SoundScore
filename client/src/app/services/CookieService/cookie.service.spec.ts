import { TestBed } from '@angular/core/testing';
import { CookieService } from './cookie.service';
import { DOCUMENT } from '@angular/common';

describe('CookieService', () => {
  let service: CookieService;
  let document: Document;

  beforeEach(() => {
    document = window.document;

    TestBed.configureTestingModule({
      providers: [
        CookieService,
        { provide: DOCUMENT, useValue: document }
      ]
    });
    service = TestBed.inject(CookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setCookie', () => {
    it('should set a cookie', () => {
      const spy = spyOnProperty(document, 'cookie', 'set').and.callThrough();
      service.setCookie('test', 'value', 1000);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('getCookie', () => {
    it('should return null for a non-existing cookie', () => {
      spyOnProperty(document, 'cookie', 'get').and.returnValue('');
      expect(service.getCookie('nonExisting')).toBeNull();
    });

    it('should return value for an existing cookie', () => {
      spyOnProperty(document, 'cookie', 'get').and.returnValue('test=value');
      expect(service.getCookie('test')).toEqual('value');
    });
  });

  describe('deleteCookie', () => {
    it('should delete a cookie', () => {
      const spy = spyOnProperty(document, 'cookie', 'set').and.callThrough();
      service.deleteCookie('test');
      expect(spy).toHaveBeenCalled();
    });
  });
});
