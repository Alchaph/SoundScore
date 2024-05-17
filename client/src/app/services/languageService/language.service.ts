import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import {environment} from "../../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { }
  language = 'de'
  public getLanguages(): string[] {
    return environment.languages;
  }
  public setLanguage(language: string): void {
    this.language = language;
  }

  public getLanguage(): string {
    return this.language;
  }

}
