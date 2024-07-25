import {Component, HostListener, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatInput} from "@angular/material/input";
import {MatSelect} from "@angular/material/select";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuContent, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {AsyncPipe, NgClass, NgForOf, NgOptimizedImage, NgStyle} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {MatBadge} from "@angular/material/badge";
import {HeaderService} from "../../services/HeaderService/header.service";
import {Notification} from "../../models/Notification";
import {CookieService} from "../../services/CookieService/cookie.service";

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
    MatToolbarRow,
    MatToolbar,
    MatIconButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    NgForOf,
    NgOptimizedImage,
    TranslateModule,
    AsyncPipe,
    NgStyle,
    MatBadge,
    FormsModule,
    MatMenuContent,
    NgClass
  ],
  templateUrl: './head-nav-bar.component.html',
  styleUrl: './head-nav-bar.component.scss'
})
export class HeadNavBarComponent implements OnInit {

  constructor(protected headerService: HeaderService, protected router: Router, private cookieService: CookieService) {
  }

  counter = 0;

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const colorBox = document.getElementById('box');
    console.log(this.colors);
    console.log(!colorBox!.contains(event.target as Node));
    console.log(this.counter);
    if (this.colors && colorBox && !colorBox.contains(event.target as Node) && this.counter === 1) {
      this.color1.setValue(getComputedStyle(document.documentElement).getPropertyValue('--first-color').trim());
      this.color2.setValue(getComputedStyle(document.documentElement).getPropertyValue('--second-color').trim());
      this.colors = false;
      this.counter = 0;
    } else if (this.colors && colorBox && !colorBox.contains(event.target as Node)) {
      console.log('increment');
      this.counter++;
    }
  }

  colors = false
  color1: FormControl = new FormControl(getComputedStyle(document.documentElement).getPropertyValue('--first-color').trim() || '', Validators.required);
  color2: FormControl = new FormControl(getComputedStyle(document.documentElement).getPropertyValue('--second-color').trim() || '', Validators.required);


  ngOnInit(): void {
    this.headerService.isLoading = this.headerService.loaderService.getIsLoading();
    if (sessionStorage.getItem('profilPicture') === null) {
      fetch('https://api.thecatapi.com/v1/images/search?limit=1&breed_ids=beng&api_key=live_Hh5C9ThNRWf8wp5Ppqb5qCAtlG48YvNlRRmig4JWPB2gwGiJOCEH63wZ1tu2SaPt')
        .then(response => response.json())
        .then(data => {
          sessionStorage.setItem('profilPicture', data[0].url);
        });
    }
    this.headerService.updateUser();
  }

  search() {
    if (this.headerService.searchTerm.valid) {
      this.router.navigate(['/home/search/', this.headerService.searchTerm.getRawValue()])
    }
  }
  logout() {
    this.router.navigate(['']);
    localStorage.setItem('token', '');
  }
  gotoUserProfile() {
    if (localStorage.getItem('selectedTabProfileTab') === null) {
      localStorage.setItem('selectedTabProfileTab', '0');
    }
    this.router.navigate([
      '/home/userProfile',
      this.headerService.userId.toString(),
      localStorage.getItem('selectedTabProfileTab')
    ]).then(() => {
      if (window.location.href.includes('home/userProfile')) {
        window.location.reload();
      }
    });
  }


  handleNotification(notification: Notification) {
    this.headerService.notificationService.markAsRead(notification).subscribe()
    let navigation: string = "/home/post/" + (notification.post ?? notification.comment.post)["id"]
    this.router.navigate([navigation])
  }

  updateColors(): void {
    document.documentElement.style.setProperty('--first-color', this.color1.value);
    document.documentElement.style.setProperty('--second-color', this.color2.value);
    this.cookieService.setCookie('color1', this.color1.value, 51 * 7 * 24 * 60 * 60 * 1000);
    this.cookieService.setCookie('color2', this.color2.value, 51 * 7 * 24 * 60 * 60 * 1000);
    this.colors = false;
    this.counter = 0;
  }

  protected readonly sessionStorage = sessionStorage;
  protected readonly document = document;
  protected readonly getComputedStyle = getComputedStyle;

  cancel() {
    this.colors = false;
    this.counter = 0;
    this.color1.setValue(getComputedStyle(document.documentElement).getPropertyValue('--first-color').trim());
    this.color2.setValue(getComputedStyle(document.documentElement).getPropertyValue('--second-color').trim());
  }
}
