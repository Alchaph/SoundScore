import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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

  constructor(protected headerService: HeaderService, protected router: Router) {

  }

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


  protected readonly sessionStorage = sessionStorage;
}
