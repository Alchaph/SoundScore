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
