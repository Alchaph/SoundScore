import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {LanguageService} from "./services/languageService/language.service";
import {Language} from "./models/Language";
import {TranslateService} from "@ngx-translate/core";
import {LoaderComponent} from "./components/loader/loader.component";
import {CookieService} from "./services/CookieService/cookie.service";
import {UserInformationComponent} from "./components/user-information/user-information.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent, UserInformationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'client';

  constructor(private languageService: LanguageService, private TranslateService: TranslateService, private cookieService: CookieService) {
    if (this.cookieService.getCookie('color1') && this.cookieService.getCookie('color2') && this.cookieService.getCookie('textColor') && this.cookieService.getCookie('buttonColor')) {
      document.documentElement.style.setProperty('--first-color', this.cookieService.getCookie('color1'));
      document.documentElement.style.setProperty('--second-color', this.cookieService.getCookie('color2'));
      document.documentElement.style.setProperty('--text-color', this.cookieService.getCookie('textColor'));
      document.documentElement.style.setProperty('--button-color', this.cookieService.getCookie('buttonColor'));
    }
  }


  ngOnInit() {
    let lang: string | null = this.cookieService.getCookie('lang')
    if (lang) {
      this.languageService.setLanguage(lang);
    } else {
      this.cookieService.setCookie('lang', this.TranslateService.getBrowserLang() ? this.TranslateService.getBrowserLang()! : 'en', 7 * 24 * 60 * 60 * 1000);
      this.languageService.setLanguage(this.TranslateService.getBrowserLang() ? this.TranslateService.getBrowserLang()! : 'en');
    }
    localStorage.setItem('selectedTabProfileTab', '0');
  }
  }
