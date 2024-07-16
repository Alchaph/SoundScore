import {Component, OnInit} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {LanguageService} from "../../services/languageService/language.service";
import {Router, RouterLink} from "@angular/router";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatInput} from "@angular/material/input";
import {MatSelect} from "@angular/material/select";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {AsyncPipe, NgForOf, NgOptimizedImage, NgStyle} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {JwtServiceService} from "../../services/JwtService/jwt-service.service";
import {Observable} from "rxjs";
import {LoaderService} from "../../services/LoaderService/loader.service";
import {Language} from "../../enums/language";
import {User} from "../../models/User";
import {Notification} from "../../models/Notification";
import {MatBadge} from "@angular/material/badge";
import {NotificationService} from "../../services/NotificationService/notification.service";

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
    MatBadge
  ],
  templateUrl: './head-nav-bar.component.html',
  styleUrl: './head-nav-bar.component.scss'
})
export class HeadNavBarComponent implements OnInit {
  protected readonly sessionStorage: Storage = sessionStorage;
  protected readonly window: Window = window;
  protected langs: (keyof typeof Language)[] = this.service.getLanguages()
  protected userId: number = 0;
  protected user: User = {} as User;
  protected unreadNotifications: Notification[] = [];
  protected isLoading: Observable<boolean> = new Observable<boolean>();
  protected readonly Language = Language;

  constructor(
    protected service: LanguageService,
    private router: Router,
    private jwtService: JwtServiceService,
    private loaderService: LoaderService,
    protected notificationService: NotificationService) {

  }


  logout() {
    this.router.navigate(['']);
    localStorage.setItem('token', '');
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
    this.updateUser();
  }

  refresh() {
    if (window.location.href === 'http://localhost:4200/home') {
      window.location.reload();
    }
  }

  gotoUserProfile() {
    // console.log(this.userId);
    if (localStorage.getItem('selectedTabProfileTab') === null) {
      localStorage.setItem('selectedTabProfileTab', '0');
    }
    this.router.navigate([
      '/home/userProfile',
      this.userId.toString(),
      localStorage.getItem('selectedTabProfileTab')
    ]).then(() => {
      if (window.location.href.includes('home/userProfile')) {
        window.location.reload();
      }
    });
  }

  updateUser() {
    this.jwtService.getMe().subscribe(data => {
      this.userId = data.id!;
      this.user = data;
      this.unreadNotifications = data.notifications.filter(n => !n.read)
    });
  }

  createTextsToDisplay(notification: Notification): string {
    let text: string = "";
    if (notification.likeOrDislike && notification.post) {
      let likeOrDislike: string = notification.likeOrDislike.like ? " liked" : " disliked"
      text = notification.likeOrDislike.user.username + likeOrDislike + " your post " + notification.post.title
    }
    if (notification.post && notification.comment) {
      text = notification.comment.user.username + " commented on your post " + notification.post.title
    }
    if (notification.comment && !notification.post) {
      text = notification.comment.user.username + " replied to your comment " + notification.comment.message
    }
    if (text.length > 35) {
      return text.substring(0, 35) + "..."
    } else {
      return text
    }
  }

  handleNotification(notification: Notification) {
    this.notificationService.markAsRead(notification).subscribe()
    let navigation: string = "/home/post/" + notification.post?.id ?? notification.comment.post.id
    this.router.navigate([navigation])
  }
}
