import { TestBed } from '@angular/core/testing';
import { GenericLanguagePipe } from './genericLanguage.pipe';
import { LanguageService } from '../services/languageService/language.service';
import { DomSanitizer } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';

describe('GenericLanguagePipe', () => {
  let pipe: GenericLanguagePipe;
  let languageServiceMock: any;
  let sanitizer: DomSanitizer;

  class MockDomSanitizer {
    bypassSecurityTrustHtml(value: string) {
      return value;
    }
  }

  beforeEach(() => {
    languageServiceMock = {
      translateText: jasmine.createSpy('translateText')
    };

    TestBed.configureTestingModule({
      providers: [
        GenericLanguagePipe,
        { provide: LanguageService, useValue: languageServiceMock },
        { provide: DomSanitizer, useClass: MockDomSanitizer }
      ]
    });

    pipe = TestBed.inject(GenericLanguagePipe);
    sanitizer = TestBed.inject(DomSanitizer);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  it('should transform text correctly (positive test)', (done) => {
    const testString = 'Hello';
    const translatedString = 'Hola';
    languageServiceMock.translateText.and.returnValue(of({ translatedText: translatedString }));

    pipe.transform(testString).subscribe(result => {
      expect(result).toEqual(sanitizer.bypassSecurityTrustHtml(translatedString));
      done();
    });
  });

  it('should handle errors gracefully (negative test)', (done) => {
    const testString = 'Hello';
    languageServiceMock.translateText.and.returnValue(throwError(() => new Error('Translation failed')));

    pipe.transform(testString).subscribe({
      next: () => {},
      error: (err) => {
        expect(err.message).toBe('Translation failed');
        done();
      },
      complete: () => done.fail('Expected an error, but the pipe completed successfully')
    });
  });
});
