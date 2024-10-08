import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
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
import {LoaderService} from "../../services/LoaderService/loader.service";
import {JwtService} from "../../services/JwtService/jwt.service";
import {User} from "../../models/User";
import { UserInformationService } from '../../services/UserInformationService/user-information.service';
import {BehaviorSubject, takeUntil} from "rxjs";

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
export class HeadNavBarComponent implements OnInit, OnDestroy {

  constructor(protected headerService: HeaderService, protected router: Router, private cookieService: CookieService, private loaderService: LoaderService, private jwtService: JwtService) {
  }

  counter = 0;

  $destroy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.complete();
  }

  user: User = {email: "", notifications: [], password: "", premium: false, username: "", followers: []};

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const colorBox = document.getElementById('box');
    if (this.colors && colorBox && !colorBox.contains(event.target as Node) && this.counter === 1) {
      this.color1.setValue(getComputedStyle(document.documentElement).getPropertyValue('--first-color').trim());
      this.color2.setValue(getComputedStyle(document.documentElement).getPropertyValue('--second-color').trim());
      this.colors = false;
      this.counter = 0;
    } else if (this.colors && colorBox && !colorBox.contains(event.target as Node)) {
      this.counter++;
    }
  }

  colors = false
  color1: FormControl = new FormControl(getComputedStyle(document.documentElement).getPropertyValue('--first-color').trim() || '', Validators.required);
  color2: FormControl = new FormControl(getComputedStyle(document.documentElement).getPropertyValue('--second-color').trim() || '', Validators.required);


  ngOnInit(): void {
    this.jwtService.getMe().pipe(takeUntil(this.$destroy)).subscribe(user => {
      this.user = user;
    });
    this.headerService.isLoading = this.loaderService.getIsLoading();
    if (sessionStorage.getItem('profilPicture') === null) {
      fetch('https://api.thecatapi.com/v1/images/search?limit=1&breed_ids=beng&api_key=live_Hh5C9ThNRWf8wp5Ppqb5qCAtlG48YvNlRRmig4JWPB2gwGiJOCEH63wZ1tu2SaPt')
        .then(response => response.json())
        .then(data => {
          sessionStorage.setItem('profilPicture', data[0].url);
        });
    }
    this.headerService.updateUser();
    setInterval(() => {
      this.headerService.updateUser();
    }, 10000);
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
    this.headerService.notificationService.markAsRead(notification).pipe(takeUntil(this.$destroy)).subscribe()
    if(notification.comment) {
      let navigation: string = "/home/post/" + notification.comment.post.id + "/comment/" + notification.comment.id
      this.router.navigate([navigation])
    }
    if (notification.post) {
      let navigation: string = "/home/post/" + notification.post.id
      this.router.navigate([navigation])
    }
    if (notification.likeOrDislike) {
      let navigation: string = "/home/post/" + notification.likeOrDislike.post.id
      this.router.navigate([navigation])
    }
    if (notification.userTag) {
      //either post or comment is null
      if (notification.userTag.post) {
        let navigation: string = "/home/post/" + notification.userTag.post.id
        this.router.navigate([navigation])
      } else {
        let navigation: string = "/home/post/" + notification.userTag.comment.post.id +"/comment/" + notification.userTag.comment.id
        this.router.navigate([navigation])
      }
    }
    if (notification.userFollower) {
      let navigation: string = "/home/userProfile/" + notification.userFollower.follower.id + "/0"
      this.router.navigate([navigation])
    }
  }

  updateColors(): void {
    if (this.getLuminance(this.color1.value) > 0.5 && this.getLuminance(this.color2.value) > 0.5) {
      document.documentElement.style.setProperty('--text-color', '#000000');
    } else {
      document.documentElement.style.setProperty('--text-color', '#ffffff');
    }
    if (this.getLuminance(this.color1.value) > this.getLuminance(this.color2.value)) {
      document.documentElement.style.setProperty('--button-color', this.color2.value);
    } else {
      document.documentElement.style.setProperty('--button-color', this.color1.value);
    }
    document.documentElement.style.setProperty('--first-color', this.color1.value);
    document.documentElement.style.setProperty('--second-color', this.color2.value);
    // Set cookie for 51 weeks
    this.cookieService.setCookie('color1', this.color1.value, 51 * 7 * 24 * 60 * 60 * 1000);
    this.cookieService.setCookie('color2', this.color2.value, 51 * 7 * 24 * 60 * 60 * 1000);
    this.cookieService.setCookie('textColor', getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim(), 51 * 7 * 24 * 60 * 60 * 1000);
    this.cookieService.setCookie('buttonColor', getComputedStyle(document.documentElement).getPropertyValue('--button-color').trim(), 51 * 7 * 24 * 60 * 60 * 1000);
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

  getLuminance(hex: string): number {
    hex = hex.replace(/^#/, '');

    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    return 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);
  }
}
