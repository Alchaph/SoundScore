import {Component, OnDestroy, OnInit} from '@angular/core';
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
import {HomeService} from "../../services/HomeService/home.service";
import { UserInformationService } from '../../services/UserInformationService/user-information.service';
import {BehaviorSubject, takeUntil} from "rxjs";

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
export class LeaderBoardComponent implements OnInit, OnDestroy{
  overallLeaderBoard: (Post | undefined)[] = [];
  artistLeaderBoard:(Artist | undefined)[] = [];
  songLeaderBoard: (Song | undefined)[] = [];
  genreLeaderBoard: (Genre | undefined)[] = [];

  constructor(private leaderBoardService: LeaderBoardService, private homeService: HomeService, private userInformationService: UserInformationService) {
  }

  $destroy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.complete();
  }

  ngOnInit(): void {
    this.leaderBoardService.getLeaderBoard().pipe(takeUntil(this.$destroy)).subscribe((data: Post[]) => {
      this.overallLeaderBoard = data;
    });
    this.leaderBoardService.getLeaderBoardByArtist().pipe(takeUntil(this.$destroy)).subscribe((data: Artist[]) => {
      this.artistLeaderBoard = Array.from(new Set(data));
    });
    this.leaderBoardService.getLeaderBoardBySong().pipe(takeUntil(this.$destroy)).subscribe((data: Song[]) => {
      this.songLeaderBoard = Array.from(new Set(data));
    });
    this.leaderBoardService.getLeaderBoardByGenre().pipe(takeUntil(this.$destroy)).subscribe((data: Genre[]) => {
      this.genreLeaderBoard = Array.from(new Set(data));
    });
  }

  openLink(link: string | undefined) {
    if (link) {
      window.open(link, '_blank');
    } else {
      this.userInformationService.setMessage('Link not found');
    }
  }

  gotoArtist(id: number | undefined) {
    if (id) {
      this.homeService.gotoArtist(id);
    } else {
      this.userInformationService.setMessage('Artist not found');
    }
  }
}
