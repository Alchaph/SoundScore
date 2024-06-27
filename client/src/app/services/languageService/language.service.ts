import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import {environment} from "../../../environments/environments";
import {TranslateService} from "@ngx-translate/core";
import {Lang} from "../../models/Lang";

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

  setLanguageCookie(lang: string): void {
    const date = new Date();
    // Set it expire in 7 days
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
    const expires = "; expires=" + date.toUTCString();
    // Set the cookie to the lang value with the expiry date
    document.cookie = "lang=" + lang + expires + "; path=/";
  }

}
