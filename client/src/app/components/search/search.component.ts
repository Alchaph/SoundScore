import {Component, OnInit} from '@angular/core';
import {HeadNavBarComponent} from "../head-nav-bar/head-nav-bar.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatChipListbox, MatChipOption} from "@angular/material/chips";
import {MatExpansionPanel, MatExpansionPanelHeader} from "@angular/material/expansion";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem} from "@angular/material/list";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {TranslateModule} from "@ngx-translate/core";
import {Post} from "../../models/Post";
import {Song} from "../../models/Song";
import {Genre} from "../../models/Genre";
import {Artist} from "../../models/Artist";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {PostService} from "../../services/PostService/post.service";
import {LeaderBoardService} from "../../services/LeaderBoardService/leader-board.service";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    HeadNavBarComponent,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatChipListbox,
    MatChipOption,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatFabButton,
    MatIcon,
    MatList,
    MatListItem,
    MatMenu,
    MatMenuItem,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    TranslateModule,
    RouterLink,
    FormsModule,
    MatMenuTrigger
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{
  posts: Post[] = [];

  topSongs: Song[] = [];
  topGenres: Genre[] = [];
  topArtists: Artist[] = [];
  isMobile: boolean = false;
  protected readonly window: Window = window;
  selectedFilters?: 'genre' | 'song' | 'artist';
  combinedList: (Genre | Artist | Song)[] = [];
  constructor(private breakpointObserver: BreakpointObserver, private postService: PostService, private leaderBoardService: LeaderBoardService) {
  }

  ngOnInit() {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.isMobile = result.matches;
    });
    this.postService.getPosts().subscribe((data: Post[]) => {
      this.posts = data.reverse();
    });
    this.leaderBoardService.getLeaderBoardByGenre().subscribe((data: Genre[]) => {
      this.topGenres = data.reverse();
    });
    this.leaderBoardService.getLeaderBoardByArtist().subscribe((data: Artist[]) => {
      this.topArtists = data.reverse();
    });
    this.leaderBoardService.getLeaderBoardBySong().subscribe((data: Song[]) => {
      this.topSongs = data.reverse();
      this.combinedList = [...this.topGenres, ...this.topArtists, ...this.topSongs];
      console.log(this.combinedList);
    });

  }

  selected(selected: string) {
    this.selectedFilters = selected.toLowerCase() as 'genre' | 'song' | 'artist';
  }

  keepMenuOpen(event: MouseEvent) {
    event.stopPropagation();
  }

  handlePanelClick(event: MouseEvent) {
    event.stopPropagation();
  }

  openLink(event: MouseEvent, link: string) {
    event.stopPropagation();
    window.open(link, '_blank');
  }

  getType(post: (Genre | Artist | Song)) {
    console.log(typeof post)
      return typeof post;
  }
}
