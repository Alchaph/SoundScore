import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environments";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {LanguageService} from "../../services/language/language.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatInput} from "@angular/material/input";
import {MatSelect} from "@angular/material/select";
import {LanguagePipe} from "../../pipes/language/language.pipe";
import {MatIcon} from "@angular/material/icon";

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
    LanguagePipe
  ],
  templateUrl: './head-nav-bar.component.html',
  styleUrl: './head-nav-bar.component.scss'
})
export class HeadNavBarComponent implements OnInit{

  currentLang = this.service.getLanguage();
  lang = new FormControl('');
  langs = this.service.getLanguages()

  picture = '';

  name = 'Herbert';


  constructor(
              // private translateService: TranslateService,
              private service: LanguageService,
              private router: Router) {

    // this.lang.valueChanges.subscribe((value) => {
    //   if (value) {
    //     this.service.setLanguage(value);
    //     this.ngOnInit()
    //   }
    // });
  }

  logout() {
    this.router.navigate(['/login']);
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
