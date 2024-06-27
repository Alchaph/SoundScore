import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {LanguageService} from "./services/languageService/language.service";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client';

  constructor() {

  }

  // setLanguageCookie(lang: string): void {
  //   const date = new Date();
  //   // Set it expire in 7 days
  //   date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
  //   const expires = "; expires=" + date.toUTCString();
  //   // Set the cookie to the lang value with the expiry date
  //   document.cookie = "lang=" + lang + expires + "; path=/";
  // }
  //
  //
  // ngOnInit() {
  //   let c = document.cookie.split(";").reduce( (ac, cv, i) => Object.assign(ac, {[cv.split('=')[0].trim()]: cv.split('=')[1]}), {});
  //   if (c) {
  //       this.setLanguageCookie('de')
  //   } else {
  //     console.log('no cookie')
  //   }
  //
  //   console.log(c);
  // }
}
