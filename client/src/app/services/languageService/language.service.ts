import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import {environment} from "../../../environments/environments";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private translateService: TranslateService) {
    this.initializeTranslationSettings();
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

}
