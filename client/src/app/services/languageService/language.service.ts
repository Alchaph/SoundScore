import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import {environment} from "../../../environments/environments";
import {TranslateService} from "@ngx-translate/core";
import {Lang} from "../../models/Lang";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private detectApiUrl = 'https://ws.detectlanguage.com/0.2/detect';
  private translateApiUrl = 'https://apid.ebay.com/commerce/translation/v1/translate';
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
    let lang: Lang = document.cookie.split(";").reduce( (ac, cv, i) => Object.assign(ac, {[cv.split('=')[0].trim()]: cv.split('=')[1]}), {}) as Lang;
    this.translateService.addLangs(environment.languages);
    this.translateService.use(lang.lang);

  }

  public setLanguage(lang: string | undefined) {
    if (lang) {
      this.setLanguageCookie(lang)
      this.translateService.use(lang);
    }

}

  translateText(text: string){
    return this.http.post<{ data: { detections: { language: string }[] } }>(
      this.detectApiUrl,
      { q: text },
      { headers: this.detectHeaders }
    ).pipe(
      map(response => response.data.detections[0].language),
      switchMap(from => this.http.post(
        this.translateApiUrl,
        { from: from,to: 'de', text: [text] ,translatedText: "Warra do"},
      ))
    );
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
