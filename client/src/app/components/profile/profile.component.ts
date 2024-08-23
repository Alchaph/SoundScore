import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeadNavBarComponent} from "../head-nav-bar/head-nav-bar.component";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {ArtistProfileComponent} from "./artist-profile/artist-profile.component";
import {UsersPostsComponent} from "./users-posts/users-posts.component";
import {MatButton} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

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
export class ProfileComponent implements OnInit, OnDestroy{
  selectedTab: string | undefined;

  $destroy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.complete();
  }

  constructor(private location: Location,private route: ActivatedRoute, private router: Router) {}
  goBack() {
    this.router.navigate(['home']);
  }
  ngOnInit() {
    const tab = this.route.snapshot.paramMap.get('tab');
    this.selectedTab = tab ?? '0';
    localStorage.setItem('selectedTabProfileTab', this.selectedTab);
  }

  onTabChange($event: number) {
    localStorage.setItem('selectedTabProfileTab', $event.toString());
    this.router.navigate(['home/userProfile', this.route.snapshot.paramMap.get('id'), $event.toString()]);
  }
}
