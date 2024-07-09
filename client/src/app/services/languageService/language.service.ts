import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environments";
import {TranslateService} from "@ngx-translate/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable, switchMap} from "rxjs";
import {CookieService} from "../CookieService/cookie.service";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  translate: boolean = JSON.parse(localStorage.getItem('translate') || 'false');
  private detectApiUrl: string = 'https://ws.detectlanguage.com/0.2/detect';
  private translateApiUrl: string = 'http://172.20.10.5:5000/translate';
  private detectHeaders: HttpHeaders = new HttpHeaders({
    'Authorization': 'Bearer 6eaddab8e75f4cba4d49499427ebce8e'
  });

  constructor(private translateService: TranslateService, private http: HttpClient, private cookieService: CookieService) {
    this.initializeTranslationSettings();
  }

  public getLanguages(): string[] {
    return environment.languages;
  }

  private initializeTranslationSettings() {
    let lang: string | null = this.cookieService.getCookie('lang');
    if (!lang) {
      lang = 'en';
    }
    this.translateService.addLangs(environment.languages);
    this.translateService.use(lang);
  }

  public setLanguage(lang: string) {
    if (lang) {
      this.cookieService.setCookie('lang', lang, 7 * 24 * 60 * 60 * 1000);
      this.translateService.use(lang);
    }
  }

  translateText(text: string): Observable<{
    translatedText: string
  }> {
    return this.http.post<{ data: { detections: { language: string }[] } }>(
      this.detectApiUrl,
      {q: text},
      {headers: this.detectHeaders}
    ).pipe(
      map(response => response.data.detections[0].language),
      switchMap(from => {
        if (from === "en" || this.cookieService.getCookie('lang') === "en") {
          return this.http.post<{
            translatedText: string
          }>(this.translateApiUrl, {
              source: from,
              target: this.cookieService.getCookie('lang') || 'en',
              q: text
            },
          )
        } else {
          return this.http.post<{
            translatedText: string
          }>(this.translateApiUrl, {source: from, target: 'en', q: text}).pipe(
            map(response => response.translatedText),
            switchMap(translatedText => this.http.post<{
                translatedText: string
              }>(this.translateApiUrl, {
                source: 'en',
                target: this.cookieService.getCookie('lang') || 'en',
                q: translatedText
              })
            )
          )
        }
      })
    );
  }

  // getLanguage(): Lang {
  //   return document.cookie.split(";").reduce((ac, cv, i) => Object.assign(ac, {[cv.split('=')[0].trim()]: cv.split('=')[1]}), {}) as Lang;
  // }
  //
  // setLanguageCookie(lang: string): void {
  //   const date: Date = new Date();
  //   date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
  //   const expires: string = "; expires=" + date.toUTCString();
  //   document.cookie = "lang=" + lang + expires + "; path=/";
  // }

}
