import {Injectable, OnInit} from '@angular/core';
import {LanguageService} from "../languageService/language.service";
import {Router} from "@angular/router";
import {JwtServiceService} from "../JwtService/jwt-service.service";
import {LoaderService} from "../LoaderService/loader.service";
import {NotificationService} from "../NotificationService/notification.service";
import {User} from "../../models/User";
import {Notification} from "../../models/Notification";
import {Observable} from "rxjs";
import {FormControl, Validators} from "@angular/forms";
import {Language} from '../../enums/language';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  public readonly sessionStorage: Storage = sessionStorage;
  public readonly window: Window = window;
  public langs: (keyof typeof Language)[] = this.service.getLanguages()
  public userId: number = 0;
  public user: User = {} as User;
  public searching: boolean;
  public unreadNotifications: Notification[];
  public showReadNotifications: boolean;
  public isLoading: Observable<boolean>;
  public readonly Language = Language;
  public searchTerm: FormControl<string | null> = new FormControl<string>("", Validators.required);


  constructor(
    public service: LanguageService,
    private jwtService: JwtServiceService,
    public loaderService: LoaderService,
    public notificationService: NotificationService) {
    this.searching = false;
    this.showReadNotifications = false;
    this.searchTerm = new FormControl<string>("", Validators.required);
    this.isLoading = this.loaderService.getIsLoading();
    this.unreadNotifications = [];
  }

  updateUser() {
    this.jwtService.getMe().subscribe(data => {
      if (data && data.id) {
        this.userId = data.id!;
        this.user = data;
        this.unreadNotifications = data.notifications.filter(n => !n.read)
      }
    });
  }





  refresh() {
    this.searching = false;
    if (window.location.href === 'http://localhost:4200/home') {
      window.location.reload();
    }
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

  markAllAsRead() {
    this.notificationService.markAllAsRead(this.user).subscribe(
      () => {
        this.unreadNotifications.forEach(n => n.read = true)
        this.unreadNotifications = []
      }
    )
  }


}
