import { Component } from '@angular/core';
import {HeadNavBarComponent} from "../head-nav-bar/head-nav-bar.component";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {ArtistProfileComponent} from "./artist-profile/artist-profile.component";
import {UsersPostsComponent} from "./users-posts/users-posts.component";
import {MatButton} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";
import {Location} from "@angular/common";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    HeadNavBarComponent,
    MatTab,
    ArtistProfileComponent,
    UsersPostsComponent,
    MatTabGroup,
    MatButton,
    TranslateModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  constructor(private location: Location) {}
  goBack() {
    this.location.back();
  }
}
