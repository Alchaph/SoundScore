import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {LanguageService} from "./services/languageService/language.service";
import {Lang} from "./models/Lang";
import {TranslateService} from "@ngx-translate/core";
import {LoaderComponent} from "./components/loader/loader.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'client';

  constructor(private languageService: LanguageService, private TranslateService: TranslateService) {

  }


  ngOnInit() {
    let lang: Lang = this.languageService.getLanguage();
    if (lang.lang) {
      this.languageService.setLanguage(lang.lang);
    } else {
      this.languageService.setLanguageCookie(this.TranslateService.getBrowserLang()? this.TranslateService.getBrowserLang()! : 'en');
      this.languageService.setLanguage(this.TranslateService.getBrowserLang()? this.TranslateService.getBrowserLang()! : 'en');
    }
  }
}
