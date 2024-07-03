import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environments";
import {TranslateService} from "@ngx-translate/core";
import {Lang} from "../../models/Lang";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  translate: boolean = JSON.parse(localStorage.getItem('translate') || 'false');
  private detectApiUrl = 'https://ws.detectlanguage.com/0.2/detect';
  private translateApiUrl = 'http://172.20.10.5:5000/translate';
  private detectHeaders = new HttpHeaders({
    'Authorization': 'Bearer 6eaddab8e75f4cba4d49499427ebce8e'
  });

  private translateHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-rapidapi-host': 'rapid-translate-multi-traduction.p.rapidapi.com',
    'x-rapidapi-key': '72535574c3mshb71887087915f24p158664jsnf5ca22245d49'
  });

  constructor(private translateService: TranslateService, private http: HttpClient) {
    this.initializeTranslationSettings();
  }

  public getLanguages(): string[] {
    return environment.languages;
  }

  private initializeTranslationSettings() {
    let lang: Lang = this.getLanguage();
    this.translateService.addLangs(environment.languages);
    this.translateService.use(lang.lang);

  }

  public setLanguage(lang: string | undefined) {
    if (lang) {
      this.setLanguageCookie(lang)
      this.translateService.use(lang);
    }

  }

  translateText(text: string) {
    return this.http.post<{ data: { detections: { language: string }[] } }>(
      this.detectApiUrl,
      {q: text},
      {headers: this.detectHeaders}
    ).pipe(
      map(response => response.data.detections[0].language),
      switchMap(from => {
        if (from === "en") {
          return this.http.post<{
            translatedText: string
          }>(this.translateApiUrl, {
              source: 'en',
              target: this.getLanguage().lang,
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
                target: this.getLanguage().lang,
                q: translatedText
              })
            )
          )
        }
      })
    );
  }

  getLanguage(): Lang {
    return document.cookie.split(";").reduce((ac, cv, i) => Object.assign(ac, {[cv.split('=')[0].trim()]: cv.split('=')[1]}), {}) as Lang;
  }

  setLanguageCookie(lang: string): void {
    const date = new Date();
    // Set it expire in 7 days
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
    const expires = "; expires=" + date.toUTCString();
    // Set the cookie to the lang value with the expiry date
    document.cookie = "lang=" + lang + expires + "; path=/";
  }

}
