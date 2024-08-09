import {Component, OnInit} from '@angular/core';
import {HeadNavBarComponent} from "../../head-nav-bar/head-nav-bar.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatExpansionPanel, MatExpansionPanelHeader} from "@angular/material/expansion";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem} from "@angular/material/list";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {RouterLink} from "@angular/router";
import {HomeService} from "../../../services/HomeService/home.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {TranslateModule} from "@ngx-translate/core";
import {Post} from "../../../models/Post";
import {Observable} from "rxjs";
import {User} from "../../../models/User";
import {PostService} from "../../../services/PostService/post.service";
import {JwtService} from "../../../services/JwtService/jwt.service";
import {LikeOrDislikeComponent} from "../../like-or-dislike/like-or-dislike.component";
import {valueReferenceToExpression} from "@angular/compiler-cli/src/ngtsc/annotations/common";

@Component({
  selector: 'app-home-mobile',
  standalone: true,
  imports: [
    HeadNavBarComponent,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatFabButton,
    MatIcon,
    MatList,
    MatListItem,
    MatMenu,
    MatMenuItem,
    RouterLink,
    MatMenuTrigger,
    TranslateModule,
    LikeOrDislikeComponent
  ],
  templateUrl: './home-mobile.component.html',
  styleUrl: './home-mobile.component.scss'
})
export class HomeMobileComponent implements OnInit {
  isMobile: boolean = false;
  selectedFilters?: 'genre' | 'song' | 'artist';
  protected likeProcessing: boolean = false;
  activeUser: User = {} as User

  constructor(protected homeService: HomeService, private breakpointObserver: BreakpointObserver, protected postService: PostService, protected jwtService: JwtService) {
  }

  ngOnInit() {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.isMobile = result.matches;
    });
    this.jwtService.getMe().subscribe(data => {
      this.activeUser = data
      this.homeService.loadPosts();
    })
  }

  selected(selected: string) {
    if (selected) {
      this.selectedFilters = selected.toLowerCase() as 'genre' | 'song' | 'artist';
    }
  }

  handlePanelClick(event: MouseEvent) {
    event.stopPropagation();
  }

  openLink(event: MouseEvent, link: string) {
    if (link) {
      event.stopPropagation();
      window.open(link, '_blank');
    }
  }

  gotoArtist(artistId: number | undefined) {
    this.homeService.gotoArtist(artistId);
  }
}
