import {Component, OnInit} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
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
import {AsyncPipe, NgForOf, NgOptimizedImage} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {JwtServiceService} from "../../services/JwtService/jwt-service.service";
import {Observable} from "rxjs";
import {LoaderService} from "../../services/LoaderService/loader.service";

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
    NgOptimizedImage,
    TranslateModule,
    AsyncPipe
  ],
  templateUrl: './head-nav-bar.component.html',
  styleUrl: './head-nav-bar.component.scss'
})
export class HeadNavBarComponent implements OnInit {
  protected readonly sessionStorage: Storage = sessionStorage;
  protected readonly window: Window = window;
  protected langs: string[] = this.service.getLanguages()
  protected userId: number = 0;
  protected isLoading: Observable<boolean> = new Observable<boolean>();


  constructor(
    protected service: LanguageService,
    private router: Router,
    private jwtService: JwtServiceService,
    private loaderService: LoaderService) {

  }


  logout() {
    this.router.navigate(['']);
    localStorage.clear();
  }

  ngOnInit(): void {
    this.isLoading = this.loaderService.getIsLoading();
    if (sessionStorage.getItem('profilPicture') === null) {
      fetch('https://api.thecatapi.com/v1/images/search?limit=1&breed_ids=beng&api_key=live_Hh5C9ThNRWf8wp5Ppqb5qCAtlG48YvNlRRmig4JWPB2gwGiJOCEH63wZ1tu2SaPt')
        .then(response => response.json())
        .then(data => {
          sessionStorage.setItem('profilPicture', data[0].url);
        });
    }
    this.jwtService.getMe().subscribe((user) => {
      this.userId = user.id!;
    });
  }

  refresh(){
    if(window.location.href === 'http://localhost:4200/home') {
      window.location.reload();
    }
  }

  reload() {
    this.router.navigate(['/home/usersPosts/', this.userId]).then(() => {
      if (window.location.href.includes('home/usersPosts')) {
        window.location.reload();
      }
    });
  }
}
