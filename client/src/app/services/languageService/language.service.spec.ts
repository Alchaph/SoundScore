import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from '../CookieService/cookie.service';
import { environment } from "../../../environments/environments";
import {TranslateModule } from "@ngx-translate/core";

describe('LanguageService', () => {
  let service: LanguageService;
  let httpMock: HttpTestingController;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LanguageService, TranslateService, TranslateModule.forRoot(), CookieService]
    });
    service = TestBed.inject(LanguageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return available languages', () => {
    const languages = service.getLanguages();
    expect(languages).toEqual(environment.languages);
  });

  it('should set language correctly', () => {
    spyOn(service, 'setLanguage');
    const lang = 'en';
    service.setLanguage(lang);
    expect(service.setLanguage).toHaveBeenCalledWith(lang);
  });

  it('should not set an unsupported language', () => {
    spyOn(service, 'setLanguage');
    const lang = 'xx';
    service.setLanguage(lang);
    expect(service.setLanguage).toHaveBeenCalledWith(lang);
  });

  it('should translate text correctly', () => {
    const mockResponse = {translatedText: 'test'};
    service.translateText('test').subscribe(response => {
      expect(response.translatedText).toEqual(mockResponse.translatedText);
    });

    const req = httpMock.expectOne(service['detectApiUrl']);
    expect(req.request.method).toBe('POST');
    req.flush({data: {detections: [{language: 'en'}]}});

    const translateReq = httpMock.expectOne(service['translateApiUrl']);
    expect(translateReq.request.method).toBe('POST');
    translateReq.flush(mockResponse);
  });

  it('should handle empty string translation', () => {
    service.translateText('').subscribe(response => {
      expect(response.translatedText).toEqual('');
    }, error => {
      expect(error).toBeTruthy();
    });

  });
});
