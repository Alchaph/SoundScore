import {Component, OnInit} from '@angular/core';
import {Post} from "../../models/Post";
import {LeaderBoardService} from "../../services/LeaderBoardService/leader-board.service";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {HeadNavBarComponent} from "../head-nav-bar/head-nav-bar.component";
import {MatList, MatListItem} from "@angular/material/list";
import {MatLine} from "@angular/material/core";
import {MatDivider} from "@angular/material/divider";
import {RouterLink} from "@angular/router";
import {Song} from "../../models/Song";
import {Artist} from "../../models/Artist";
import {Genre} from "../../models/Genre";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-leader-board',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    HeadNavBarComponent,
    MatList,
    MatListItem,
    MatLine,
    MatDivider,
    RouterLink,
    TranslateModule
  ],
  templateUrl: './leader-board.component.html',
  styleUrl: './leader-board.component.scss'
})
export class LeaderBoardComponent implements OnInit{
  overallLeaderBoard: (Post | undefined)[] = [];
  artistLeaderBoard:(Artist | undefined)[] = [];
  songLeaderBoard: (Song | undefined)[] = [];
  genreLeaderBoard: (Genre | undefined)[] = [];

  constructor(private leaderBoardService: LeaderBoardService) {
  }

  ngOnInit(): void {
    this.leaderBoardService.getLeaderBoard().subscribe((data: Post[]) => {
      this.overallLeaderBoard = data;
    });
    this.leaderBoardService.getLeaderBoardByArtist().subscribe((data: Artist[]) => {
      this.artistLeaderBoard = Array.from(new Set(data));
    });
    this.leaderBoardService.getLeaderBoardBySong().subscribe((data: Song[]) => {
      console.log(data);
      this.songLeaderBoard = Array.from(new Set(data));
    });
    this.leaderBoardService.getLeaderBoardByGenre().subscribe((data: Genre[]) => {
      this.genreLeaderBoard = Array.from(new Set(data));
    });
  }

  openLink(link: string | undefined) {
    window.open(link, '_blank');
  }
}
