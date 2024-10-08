import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {LanguageService} from "../languageService/language.service";
import {Router} from "@angular/router";
import {JwtService} from "../JwtService/jwt.service";
import {LoaderService} from "../LoaderService/loader.service";
import {NotificationService} from "../NotificationService/notification.service";
import {User} from "../../models/User";
import {Notification} from "../../models/Notification";
import {BehaviorSubject, Observable, takeUntil} from "rxjs";
import {FormControl, Validators} from "@angular/forms";
import {Language} from '../../enums/language';

@Injectable({
  providedIn: 'root'
})
export class HeaderService implements OnDestroy{
  public readonly sessionStorage: Storage = sessionStorage;
  public readonly window: Window = window;
  public langs: (keyof typeof Language)[] = this.service.getLanguages()
  public userId: number = 0;
  public user: User = {} as User;
  public searching: boolean;
  public unreadNotifications:  Notification[];
  public showReadNotifications: boolean;
  public isLoading: Observable<boolean>;
  public readonly Language = Language;
  public searchTerm: FormControl<string | null> = new FormControl<string>("", Validators.required);


  constructor(
    public service: LanguageService,
    private jwtService: JwtService,
    public loaderService: LoaderService,
    public notificationService: NotificationService) {
    this.searching = false;
    this.showReadNotifications = false;
    this.searchTerm = new FormControl<string>("", Validators.required);
    this.isLoading = this.loaderService.getIsLoading();
    this.unreadNotifications = [];
  }

  $destroy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.complete();
  }

  updateUser() {
    this.jwtService.getMe().subscribe(user => {
      if (user && user.id) {
        this.userId = user.id!;
        this.user = user;
        this.unreadNotifications = user.notifications.filter(n => !n.read);
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
      text = notification.comment.user.username + " replied to your comment with " + notification.comment.message
    }
    if (notification.userFollower && notification.userFollower.user) {
      text = notification.userFollower.user.username + " followed you"
    }
    if (notification.userTag && notification.userTag.taggedUser && notification.userTag.post) {
      text = notification.userTag.user.username + " mentioned you in a post"
    }
    if (notification.userTag && notification.userTag.taggedUser && notification.userTag.comment.post) {
      text = notification.userTag.user.username + " mentioned you  in a comment"
    }
    if (text.length > 35) {
      return text.substring(0, 35) + "..."
    } else {
      return text
    }
  }

  createPicToDisplay(notification: Notification): string {
    let pic: string = "";
    if (notification.likeOrDislike && notification.post) {
      pic = notification.post.image;
    }
    if (notification.post && notification.comment) {
      pic = notification.post.image;
    }
    if (notification.comment && !notification.post) {
      pic = notification.comment.post.image;
    }
    if (notification.userFollower && notification.userFollower.user) {
      pic = 'https://c.tenor.com/lkcr4ohzg0MAAAAd/tenor.gif';
    }
    if (notification.userTag && notification.userTag.taggedUser && notification.userTag.post) {
      pic = notification.userTag.post.image;
    }
    if (notification.userTag && notification.userTag.taggedUser && notification.userTag.comment) {
      pic = notification.userTag.comment.post.image;
    }
    return pic;
  }



  markAllAsRead() {
    this.notificationService.markAllAsRead(this.user).pipe(takeUntil(this.$destroy)).subscribe(
      () => {
        this.unreadNotifications.forEach(n => n.read = true)
        this.unreadNotifications = []
      }
    )
  }


}
