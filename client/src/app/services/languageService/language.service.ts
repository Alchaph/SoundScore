import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environments";
import {TranslateService} from "@ngx-translate/core";
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
    this.translateText("Hello World.")
  }

  public getLanguages(): string[] {
    return environment.languages;
  }

  private initializeTranslationSettings() {
    this.translateService.addLangs(environment.languages);
    this.translateService.use('de');
  }

  public setLanguage(lang: string) {
    this.translateService.use(lang);
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
}
