import {Component, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {LanguageService} from "../../services/languageService/language.service";
import {Router, RouterLink} from "@angular/router";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatInput} from "@angular/material/input";
import {MatSelect} from "@angular/material/select";
import {LanguagePipe} from "../../pipes/language/language.pipe";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {NgForOf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-head-nav-bar',
  standalone: true,
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    MatInput,
    MatSelect,
    MatOption,
    MatLabel,
    MatIcon,
    RouterLink,
    LanguagePipe,
    MatToolbarRow,
    MatToolbar,
    MatIconButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    NgForOf,
    NgOptimizedImage
  ],
  templateUrl: './head-nav-bar.component.html',
  styleUrl: './head-nav-bar.component.scss'
})
export class HeadNavBarComponent implements OnInit {

  currentLang: string;
  lang = new FormControl('');
  langs = this.service.getLanguages()
  picture = '';
  name = 'Herbert';


  constructor(
    // private translateService: TranslateService,
    protected service: LanguageService,
    private router: Router) {
    this.currentLang = this.service.getLanguage();
    // this.lang.valueChanges.subscribe((value) => {
    //   if (value) {
    //     this.service.setLanguage(value);
    //     this.ngOnInit()
    //   }
    // });
  }


  logout() {
    this.router.navigate(['']);
    sessionStorage.clear();
  }

  ngOnInit(): void {
    fetch('https://api.thecatapi.com/v1/images/search?limit=1&breed_ids=beng&api_key=live_Hh5C9ThNRWf8wp5Ppqb5qCAtlG48YvNlRRmig4JWPB2gwGiJOCEH63wZ1tu2SaPt')
      .then(response => response.json())
      .then(data => this.picture = data[0].url);
  }

  // ngOnInit() {
  //   this.translateService.addLangs(environment.languages);
  //   const lang = this.service.getLanguage();
  //   this.setLanguage(lang);
  // }
  //
  // setLanguage(lang: string) {
  //   this.translateService.use(lang);
  // }
}
