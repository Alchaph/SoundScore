import { Component } from '@angular/core';
import {environment} from "../../../environments/environments";
import {FormControl} from "@angular/forms";
import {LanguageService} from "../../services/language/language.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-head-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './head-nav-bar.component.html',
  styleUrl: './head-nav-bar.component.scss'
})
export class HeadNavBarComponent {

  title = 'GradeSystem';
  currentLang = this.service.getLanguage();
  lang = new FormControl('');
  langs = this.service.getLanguages()

  anzMessages = 0;


  constructor(private translateService: TranslateService,
              private service: LanguageService,
              private router: Router) {

    this.lang.valueChanges.subscribe((value) => {
      if (value) {
        this.service.setLanguage(value);
        this.ngOnInit()
      }
    });
  }

  logout() {
    this.router.navigate(['/login']);
    sessionStorage.clear();
  }

  ngOnInit() {
    this.translateService.addLangs(environment.languages);
    const lang = this.service.getLanguage();
    this.setLanguage(lang);
  }

  setLanguage(lang: string) {
    this.translateService.use(lang);
  }
}
